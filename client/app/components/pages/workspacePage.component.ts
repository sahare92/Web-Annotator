import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../models/Page';
import { User } from '../../models/User';
import { Task } from '../../models/Task';
import { Annotation, DisplayedAnnotation } from '../../models/Annotation';
import { PageAnnotation } from '../../models/PageAnnotation';
import { Manuscript } from '../../models/Manuscript';
import { ManuscriptsService } from '../../services/manuscript.service';
import { TasksService} from '../../services/tasks.service';
import { UsersService } from '../../services/users.service';
import { WindowService } from '../../services/window.service';
import { WindowConAnno } from '../../models/WindowConAnno';
import { Component, Injectable, Input } from '@angular/core';
import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'workspace-page',
  templateUrl: '../../../../templates/workspacePage.component.html',
  styleUrls: ['../../../../styles/workspace.css']
})

export class WorkspacePageComponent {
	user: User;
	pageAnnotation: PageAnnotation;
	page: Page;
	tasks: Task[];
	task: Task;
	loaded: Boolean;
	_window: WindowConAnno;
	selectedMethod: string;  // 'task' or 'page'. determines whether to open a 'task' / select a manuscript and then select a 'page'

	constructor(
		private windowService: WindowService,
	 	private usersService: UsersService, 
	 	private manuscriptsService: ManuscriptsService,
	 	private tasksService: TasksService)
	{
		this.loaded = false;
		this._window = windowService.nativeWindow;
		this.init();
	}

	init() {
		this.getLoggedUser();
	}

	getLoggedUser() {
		this.usersService.getLoggedUser()
			.subscribe(
				res => {
					if (res){
						this.user = res;
						this.loadTasks();
					}
				},
				err => {
					alert('no logged user! redirect or something');
				});
	}

	// Currently it loads the annotation of the current user
	loadPageAnnotation(query) {
		this.manuscriptsService.getPageAnnotations(query)
			.subscribe(
				res => {
					if (res) {
						if(res.length > 0){
							this.pageAnnotation = res[0];
							this.loaded = true;
						}
					}
					else {
						alert('Error: unable to find the page annotation of this task')
					}
				},
				err => {
					alert(err);
				}
			);
	}

	resetBody() {
		this.loaded = false;
		this.page = null;
		this.pageAnnotation = null;
		this.task = null;
	}

	loadTasks() {
		let query = {}
		this.tasksService.getTasks(query)
			.subscribe(
				res => {
					if (res) {
						this.tasks = res;
					}
				},
				err => {
					alert(err);
				}
			);
	}

	prettifyTaskDescription(task) {
		if(!task)
			return null;
		return task.manuscript.name + '/' + task.page.name;
	}

	getCurrentTaskDescription() {
		return this.prettifyTaskDescription(this.task) || 'Select';
	}

	selectTask(task) {
		this.resetBody();
		this.task = task;
		this.page = this.task.page;
		let query = { _id: this.task.pageAnnotation._id };
		this.loadPageAnnotation(query);
	}

	isVerifier() {
		return this.task.verifier._id == this.user._id;
	}

	isAnnotator() {
		return this.task.annotator._id == this.user._id;
	}

	isAssigner() {
		return this.task.assigner._id == this.user._id;
	}

	userTaskRolesToString() {
		let res = [];

		if (this.isVerifier())
			res.push('verifier');
		if (this.isAnnotator())
			res.push('annotator');
		if (this.isAssigner())
			res.push('assigner')

		return res.toString();
	}

	getVerifiedState() {
		try {
			if (!this.task.verified)
				return 'Verify';
			else
				return 'Unverify';
		}
		catch {
			alert('Error: finding verified state of current task');
		}
	}

	verifyTaskSwitch() {
		let query = { _id: this.task._id, verified: !this.task.verified };
		this.tasksService.updateTask(query)
			.subscribe(
				res => {
					if (res) {
						alert("The task verified successfully");
						this.resetBody();
						this.loadTasks();
					}
				},
				err => {
					alert(err);
				}
			);
	}
}