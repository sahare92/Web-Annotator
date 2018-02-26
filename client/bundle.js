var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("components/pages/homePage.component", ["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, HomePageComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            HomePageComponent = /** @class */ (function () {
                function HomePageComponent() {
                }
                HomePageComponent = __decorate([
                    core_1.Component({
                        moduleId: module.id,
                        selector: 'home-page',
                        templateUrl: '../../../../templates/homePage.component.html'
                    })
                ], HomePageComponent);
                return HomePageComponent;
            }());
            exports_1("HomePageComponent", HomePageComponent);
        }
    };
});
System.register("components/pages/aboutPage.component", ["@angular/core"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, AboutPageComponent;
    return {
        setters: [
            function (core_2_1) {
                core_2 = core_2_1;
            }
        ],
        execute: function () {
            AboutPageComponent = /** @class */ (function () {
                function AboutPageComponent() {
                }
                AboutPageComponent = __decorate([
                    core_2.Component({
                        moduleId: module.id,
                        selector: 'about-page',
                        templateUrl: '../../../../templates/aboutPage.component.html',
                        styleUrls: ['../../../../styles/about.css']
                    })
                ], AboutPageComponent);
                return AboutPageComponent;
            }());
            exports_2("AboutPageComponent", AboutPageComponent);
        }
    };
});
System.register("models/Page", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Page;
    return {
        setters: [],
        execute: function () {
            Page = /** @class */ (function () {
                function Page(data) {
                    if (data != null) {
                        this._id = data._id;
                        this.manuscript = data.manuscript;
                        this.name = data.name;
                        this.image = data.image;
                    }
                }
                return Page;
            }());
            exports_3("Page", Page);
        }
    };
});
System.register("models/User", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var User;
    return {
        setters: [],
        execute: function () {
            User = /** @class */ (function () {
                function User(data) {
                    if (data != null) {
                        this._id = data._id;
                        this.name = data.name;
                        this.family_name = data.family_name;
                        this.password = data.password;
                        this.email = data.email;
                        this.affiliation = data.affiliation;
                        this.role = data.role;
                    }
                }
                return User;
            }());
            exports_4("User", User);
        }
    };
});
System.register("models/Annotation", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Annotation, DisplayedAnnotation;
    return {
        setters: [],
        execute: function () {
            Annotation = /** @class */ (function () {
                function Annotation(data) {
                    if (data != null) {
                        this.text = data.text;
                        this.geometry = data.geometry;
                    }
                }
                // Doesn't compare the text
                Annotation.prototype.isEqualToDisplayedAnno = function (displayedAnno) {
                    var displayedGeometry = displayedAnno.shapes[0].geometry;
                    return this.isEqualGeometries(this.geometry, displayedGeometry);
                };
                Annotation.prototype.isEqualGeometries = function (firstG, secondG) {
                    var res = true;
                    if (firstG.x != secondG.x)
                        res = false;
                    else if (firstG.y != secondG.y)
                        res = false;
                    else if (firstG.width != secondG.width)
                        res = false;
                    else if (firstG.height != secondG.height)
                        res = false;
                    return res;
                };
                Annotation.copyDisplayedAnnotation = function (displayedAnno) {
                    return new Annotation({
                        text: displayedAnno.text,
                        geometry: displayedAnno.shapes[0].geometry
                    });
                };
                return Annotation;
            }());
            exports_5("Annotation", Annotation);
            // Used to display load annotation using the Annotorious library
            DisplayedAnnotation = /** @class */ (function () {
                function DisplayedAnnotation(data, imageSrc) {
                    if (data != null) {
                        this.text = data.text;
                        this.src = imageSrc;
                        this.shapes = [
                            {
                                type: 'rect',
                                geometry: data.geometry
                            }
                        ];
                    }
                }
                return DisplayedAnnotation;
            }());
            exports_5("DisplayedAnnotation", DisplayedAnnotation);
        }
    };
});
System.register("models/Coordinates", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Coordinate;
    return {
        setters: [],
        execute: function () {
            Coordinate = /** @class */ (function () {
                function Coordinate() {
                }
                return Coordinate;
            }());
            exports_6("Coordinate", Coordinate);
        }
    };
});
System.register("models/FreeDraw", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var FreeDraw;
    return {
        setters: [],
        execute: function () {
            FreeDraw = /** @class */ (function () {
                function FreeDraw() {
                }
                return FreeDraw;
            }());
            exports_7("FreeDraw", FreeDraw);
        }
    };
});
System.register("models/PageAnnotation", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var PageAnnotation;
    return {
        setters: [],
        execute: function () {
            PageAnnotation = /** @class */ (function () {
                function PageAnnotation(data) {
                    if (data != null) {
                        this._id = data._id;
                        this.page = data.page;
                        this.user = data.user;
                        this.annotations = data.annotations;
                        this.freeDraws = data.freeDraws;
                    }
                }
                return PageAnnotation;
            }());
            exports_8("PageAnnotation", PageAnnotation);
        }
    };
});
System.register("models/Manuscript", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Manuscript;
    return {
        setters: [],
        execute: function () {
            Manuscript = /** @class */ (function () {
                function Manuscript(data) {
                    if (data != null) {
                        this._id = data._id;
                        this.name = data.name;
                        this.owner = data.owner;
                        this.shared = data.shared;
                        this.authoring = data.authoring;
                        this.main_field_of_study = data.man_field_of_study;
                        this.sub_field_of_study = data.sub_field_of_study;
                        this.visual_content_category = data.visual_content_category;
                        this.writing = data.writing;
                        this.source = data.source;
                        this.original_writing_media = data.original_writing_media;
                        this.number_of_pages = data.number_of_pages;
                        this.page_size = data.page_size;
                        this.font = data.font;
                        this.is_complete = data.is_complete;
                        this.number_of_front_cover_pages = data.number_of_front_cover_pages;
                        this.number_of_back_cover_pages = data.number_of_back_cover_pages;
                        this.known_copies = data.known_copies;
                        this.known_revisions = data.known_revisions;
                    }
                    else {
                        this.authoring = { name: null, date: null, country: null };
                        this.writing = { name: null, date: null, country: null };
                        this.source = { name: null, date: null, country: null };
                    }
                }
                return Manuscript;
            }());
            exports_9("Manuscript", Manuscript);
        }
    };
});
System.register("models/Task", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var Task;
    return {
        setters: [],
        execute: function () {
            Task = /** @class */ (function () {
                function Task(data) {
                    if (data != null) {
                        this._id = data._id;
                        this.assigner = data.assigner;
                        this.annotator = data.annotator;
                        this.verifier = data.verifier;
                        this.verified = data.verified;
                        this.pageAnnotation = data.pageAnnotation;
                        this.manuscript = data.manuscript;
                        this.page = data.page;
                    }
                }
                return Task;
            }());
            exports_10("Task", Task);
        }
    };
});
System.register("services/manuscript.service", ["@angular/core", "@angular/http", "rxjs/add/operator/map"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_3, http_1, ManuscriptsService;
    return {
        setters: [
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            ManuscriptsService = /** @class */ (function () {
                function ManuscriptsService(http) {
                    this.http = http;
                }
                ManuscriptsService.prototype.getManuscripts = function () {
                    return this.http.get('/api/manuscripts')
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                ManuscriptsService.prototype.getPageByID = function (id) {
                    return this.http.get('/api/pages/' + id)
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                ManuscriptsService.prototype.addManuscript = function (newMan) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/manuscripts', JSON.stringify(newMan), { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                ManuscriptsService.prototype.updateMan = function (newMan) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put('/api/manuscripts/' + newMan._id, JSON.stringify(newMan), { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                /* Pages */
                ManuscriptsService.prototype.getPages = function (query) {
                    var url = '/api/pages?';
                    for (var p in query) {
                        if (query.hasOwnProperty(p))
                            url = url.concat(p + '=' + query[p]);
                    }
                    return this.http.get(url)
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                /* Page Annotations  */
                ManuscriptsService.prototype.exportCanvas = function (id, blob) {
                    var headers = new http_1.Headers();
                    var file = blob;
                    var formData = new FormData();
                    console.log(blob);
                    console.log(file);
                    formData.append('uploadFile', blob);
                    console.log(formData);
                    return this.http.post('/api/pageAnnotations/' + '/file/' + id, formData, { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                ManuscriptsService.prototype.getPageAnnotationByID = function (id) {
                    return this.http.get('/api/pageAnnotations/' + id)
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                ManuscriptsService.prototype.getPageAnnotations = function (query) {
                    var url = '/api/pageAnnotations?';
                    for (var p in query) {
                        if (query.hasOwnProperty(p))
                            if (url.charAt(url.length - 1) != '?')
                                url = url.concat('&');
                        url = url.concat(p + '=' + query[p]);
                    }
                    return this.http.get(url)
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                ManuscriptsService.prototype.updatePageAnnotaion = function (id, options) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put('/api/pageAnnotations/' + id, options)
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                ManuscriptsService.prototype.addPageAnnotation = function (options) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/pageAnnotations', JSON.stringify(options), { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                /*================= Page ===================*/
                ManuscriptsService.prototype.uploadPages = function (formData, manuscriptID) {
                    var headers = new http_1.Headers();
                    formData.append('manuscript', manuscriptID);
                    return this.http.post('/api/pages/upload', formData, { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                ManuscriptsService = __decorate([
                    core_3.Injectable(),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
                ], ManuscriptsService);
                return ManuscriptsService;
                var _a;
            }());
            exports_11("ManuscriptsService", ManuscriptsService);
        }
    };
});
System.register("services/tasks.service", ["@angular/core", "@angular/http", "rxjs/add/operator/map"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_4, http_2, TasksService;
    return {
        setters: [
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (_2) {
            }
        ],
        execute: function () {
            TasksService = /** @class */ (function () {
                function TasksService(http) {
                    this.http = http;
                }
                TasksService.prototype.getTasks = function (query) {
                    var url = '/api/tasks?';
                    for (var p in query) {
                        if (query.hasOwnProperty(p)) {
                            url = url.concat(p + '=' + query[p]);
                            url = url.concat("&");
                        }
                    }
                    return this.http.get(url)
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                TasksService.prototype.getTasksByUser = function (query) {
                    var url = '/api/tasks/user/?';
                    for (var p in query) {
                        if (query.hasOwnProperty(p)) {
                            url = url.concat(p + '=' + query[p]);
                            url = url.concat("&");
                        }
                    }
                    return this.http.get(url)
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                TasksService.prototype.addTask = function (t) {
                    var headers = new http_2.Headers();
                    console.log(t);
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/tasks', JSON.stringify(t), { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                TasksService.prototype.updateTask = function (task) {
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put('/api/tasks/' + task._id, JSON.stringify(task), { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                TasksService = __decorate([
                    core_4.Injectable(),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_2.Http !== "undefined" && http_2.Http) === "function" && _a || Object])
                ], TasksService);
                return TasksService;
                var _a;
            }());
            exports_12("TasksService", TasksService);
        }
    };
});
System.register("services/users.service", ["@angular/core", "@angular/http", "rxjs/add/operator/map"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_5, http_3, UsersService;
    return {
        setters: [
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (_3) {
            }
        ],
        execute: function () {
            UsersService = /** @class */ (function () {
                function UsersService(http) {
                    this.http = http;
                }
                UsersService.prototype.getUsers = function (query) {
                    var url = '/api/users?';
                    for (var p in query) {
                        if (query.hasOwnProperty(p)) {
                            url = url.concat(p + '=' + query[p]);
                            url = url.concat("&");
                        }
                    }
                    return this.http.get(url)
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                UsersService.prototype.addUser = function (newUser) {
                    var headers = new http_3.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/users', JSON.stringify(newUser), { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                UsersService.prototype.updateUser = function (user) {
                    var headers = new http_3.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put('/api/users/' + user._id, JSON.stringify(user), { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                UsersService.prototype.deleteUser = function (id) {
                    return this.http.delete('/api/users/' + id)
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                UsersService.prototype.loginUser = function (userDetails) {
                    var headers = new http_3.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/login', JSON.stringify(userDetails), { headers: headers })
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                UsersService.prototype.getLoggedUser = function () {
                    return this.http.get('/api/login')
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                UsersService.prototype.logOutUser = function () {
                    return this.http.delete('/api/login')
                        .map(function (res) {
                        if (res.status < 200 || res.status >= 300)
                            throw new Error();
                        else
                            return res.json();
                    });
                };
                UsersService = __decorate([
                    core_5.Injectable(),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_3.Http !== "undefined" && http_3.Http) === "function" && _a || Object])
                ], UsersService);
                return UsersService;
                var _a;
            }());
            exports_13("UsersService", UsersService);
        }
    };
});
System.register("services/window.service", ["@angular/core"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    function getWindow() {
        return window;
    }
    var core_6, WindowService;
    return {
        setters: [
            function (core_6_1) {
                core_6 = core_6_1;
            }
        ],
        execute: function () {
            WindowService = /** @class */ (function () {
                function WindowService() {
                }
                Object.defineProperty(WindowService.prototype, "nativeWindow", {
                    get: function () {
                        return getWindow();
                    },
                    enumerable: true,
                    configurable: true
                });
                WindowService = __decorate([
                    core_6.Injectable()
                ], WindowService);
                return WindowService;
            }());
            exports_14("WindowService", WindowService);
        }
    };
});
System.register("models/WindowConAnno", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var WindowConAnno;
    return {
        setters: [],
        execute: function () {
            WindowConAnno = /** @class */ (function () {
                function WindowConAnno() {
                }
                return WindowConAnno;
            }());
            exports_15("WindowConAnno", WindowConAnno);
        }
    };
});
System.register("components/pages/workspacePage.component", ["services/manuscript.service", "services/tasks.service", "services/users.service", "services/window.service", "@angular/core"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var manuscript_service_1, tasks_service_1, users_service_1, window_service_1, core_7, WorkspacePageComponent;
    return {
        setters: [
            function (manuscript_service_1_1) {
                manuscript_service_1 = manuscript_service_1_1;
            },
            function (tasks_service_1_1) {
                tasks_service_1 = tasks_service_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (window_service_1_1) {
                window_service_1 = window_service_1_1;
            },
            function (core_7_1) {
                core_7 = core_7_1;
            }
        ],
        execute: function () {
            WorkspacePageComponent = /** @class */ (function () {
                function WorkspacePageComponent(windowService, usersService, manuscriptsService, tasksService) {
                    this.windowService = windowService;
                    this.usersService = usersService;
                    this.manuscriptsService = manuscriptsService;
                    this.tasksService = tasksService;
                    this.loaded = false;
                    this._window = windowService.nativeWindow;
                    this.init();
                }
                WorkspacePageComponent.prototype.init = function () {
                    this.getLoggedUser();
                };
                WorkspacePageComponent.prototype.getLoggedUser = function () {
                    var _this = this;
                    this.usersService.getLoggedUser()
                        .subscribe(function (res) {
                        if (res) {
                            _this.user = res;
                            _this.loadTasks();
                        }
                    }, function (err) {
                        alert('no logged user! redirect or something');
                    });
                };
                // Currently it loads the annotation of the current user
                WorkspacePageComponent.prototype.loadPageAnnotation = function (query) {
                    var _this = this;
                    this.manuscriptsService.getPageAnnotations(query)
                        .subscribe(function (res) {
                        if (res) {
                            if (res.length > 0) {
                                _this.pageAnnotation = res[0];
                                _this.loaded = true;
                            }
                        }
                        else {
                            alert('Error: unable to find the page annotation of this task');
                        }
                    }, function (err) {
                        alert(err);
                    });
                };
                WorkspacePageComponent.prototype.resetBody = function () {
                    this.loaded = false;
                    this.page = null;
                    this.pageAnnotation = null;
                    this.task = null;
                };
                WorkspacePageComponent.prototype.loadTasks = function () {
                    var _this = this;
                    var query = { user: this.user._id };
                    this.tasksService.getTasksByUser(query)
                        .subscribe(function (res) {
                        if (res) {
                            _this.tasks = res;
                        }
                    }, function (err) {
                        alert(err);
                    });
                };
                WorkspacePageComponent.prototype.prettifyTaskDescription = function (task) {
                    if (!task)
                        return null;
                    return task.manuscript.name + '/' + task.page.name;
                };
                WorkspacePageComponent.prototype.getCurrentTaskDescription = function () {
                    return this.prettifyTaskDescription(this.task) || 'Select';
                };
                WorkspacePageComponent.prototype.selectTask = function (task) {
                    this.resetBody();
                    this.task = task;
                    this.page = this.task.page;
                    var query = { _id: this.task.pageAnnotation._id };
                    this.loadPageAnnotation(query);
                };
                WorkspacePageComponent.prototype.isVerifier = function () {
                    return this.task.verifier._id == this.user._id;
                };
                WorkspacePageComponent.prototype.isAnnotator = function () {
                    return this.task.annotator._id == this.user._id;
                };
                WorkspacePageComponent.prototype.isAssigner = function () {
                    return this.task.assigner._id == this.user._id;
                };
                WorkspacePageComponent.prototype.userTaskRolesToString = function () {
                    var res = [];
                    if (this.isVerifier())
                        res.push('verifier');
                    if (this.isAnnotator())
                        res.push('annotator');
                    if (this.isAssigner())
                        res.push('assigner');
                    return res.toString();
                };
                WorkspacePageComponent.prototype.getVerifiedState = function () {
                    try {
                        if (!this.task.verified)
                            return 'Verify';
                        else
                            return 'Unverify';
                    }
                    catch (exc) {
                        alert('Error: finding verified state of current task');
                    }
                };
                WorkspacePageComponent.prototype.verifyTaskSwitch = function () {
                    var _this = this;
                    var query = { _id: this.task._id, verified: !this.task.verified };
                    this.tasksService.updateTask(query)
                        .subscribe(function (res) {
                        if (res) {
                            alert("The task verified successfully");
                            _this.resetBody();
                            _this.loadTasks();
                        }
                    }, function (err) {
                        alert(err);
                    });
                };
                WorkspacePageComponent = __decorate([
                    core_7.Component({
                        moduleId: module.id,
                        selector: 'workspace-page',
                        templateUrl: '../../../../templates/workspacePage.component.html',
                        styleUrls: ['../../../../styles/workspace.css']
                    }),
                    __metadata("design:paramtypes", [window_service_1.WindowService,
                        users_service_1.UsersService,
                        manuscript_service_1.ManuscriptsService,
                        tasks_service_1.TasksService])
                ], WorkspacePageComponent);
                return WorkspacePageComponent;
            }());
            exports_16("WorkspacePageComponent", WorkspacePageComponent);
        }
    };
});
System.register("components/pages/manuscripts.component", ["@angular/core", "services/manuscript.service", "models/Manuscript", "services/users.service", "services/tasks.service", "models/Task", "models/PageAnnotation"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_8, manuscript_service_2, Manuscript_1, users_service_2, tasks_service_2, Task_1, PageAnnotation_1, ManuscriptsComponent;
    return {
        setters: [
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (manuscript_service_2_1) {
                manuscript_service_2 = manuscript_service_2_1;
            },
            function (Manuscript_1_1) {
                Manuscript_1 = Manuscript_1_1;
            },
            function (users_service_2_1) {
                users_service_2 = users_service_2_1;
            },
            function (tasks_service_2_1) {
                tasks_service_2 = tasks_service_2_1;
            },
            function (Task_1_1) {
                Task_1 = Task_1_1;
            },
            function (PageAnnotation_1_1) {
                PageAnnotation_1 = PageAnnotation_1_1;
            }
        ],
        execute: function () {
            ManuscriptsComponent = /** @class */ (function () {
                function ManuscriptsComponent(mScriptService, uService, tService) {
                    this.mScriptService = mScriptService;
                    this.uService = uService;
                    this.tService = tService;
                    this.init();
                }
                ManuscriptsComponent.prototype.init = function () {
                    this.existingManuscript = [];
                    this.getCurrUser();
                    this.newMan = new Manuscript_1.Manuscript(null);
                    this.currManuscript = null;
                    this.getAllUsers();
                    this.shareableUsers = [];
                    this.verifer = null;
                    this.canCreateTask = false;
                    this.tasks = null;
                };
                ManuscriptsComponent.prototype.canTaskBeCreated = function () {
                    return this.annotator
                        && this.activePage && this.currManuscript
                        && this.verifer;
                };
                ManuscriptsComponent.prototype.getCurrPageName = function () {
                    if (this.activePage) {
                        return this.activePage.name;
                    }
                    else {
                        return "Please select page";
                    }
                };
                ManuscriptsComponent.prototype.getCurrAnnotatorName = function () {
                    if (this.annotator) {
                        return this.annotator.name;
                    }
                    else {
                        return "Please select user";
                    }
                };
                ManuscriptsComponent.prototype.getCurrVerifyerName = function () {
                    if (this.verifer) {
                        return this.verifer.name;
                    }
                    else {
                        return "Please select user";
                    }
                };
                ManuscriptsComponent.prototype.getAllUsers = function () {
                    var _this = this;
                    this.uService.getUsers(null).subscribe(function (r) {
                        _this.allUsers = r;
                    }, function (e) {
                        alert("Some error happedened" + e);
                    });
                };
                ManuscriptsComponent.prototype.assignTask = function () {
                    var _this = this;
                    var taskData = {
                        manuscript: this.currManuscript._id,
                        page: this.activePage._id,
                        annotator: this.annotator._id,
                        verifier: this.verifer._id,
                        assigner: this.currUser._id,
                    };
                    var pageAnnotationData = {
                        user: this.annotator._id,
                        page: this.activePage
                    };
                    var pAnnotation = new PageAnnotation_1.PageAnnotation(pageAnnotationData);
                    var t = new Task_1.Task(taskData);
                    this.mScriptService.addPageAnnotation(pAnnotation)
                        .subscribe(function (pageAnno) {
                        t.pageAnnotation = pageAnno;
                        _this.tService.addTask(t).subscribe(function (r) {
                            alert("task created succesfuly");
                        }, function (err) {
                            alert("Cannot create task");
                        });
                    }, function (e) {
                        alert("cannot create page annotation");
                    });
                };
                ManuscriptsComponent.prototype.setAnnotator = function (u) {
                    this.annotator = u;
                };
                ManuscriptsComponent.prototype.setVerifyer = function (u) {
                    this.verifer = u;
                };
                ManuscriptsComponent.prototype.getCurrManuscriptName = function () {
                    if (this.currManuscript == null) {
                        return "Select Manuscript";
                    }
                    else {
                        return this.currManuscript.name;
                    }
                };
                ManuscriptsComponent.prototype.getExisting = function () {
                    var _this = this;
                    this.mScriptService.getManuscripts().subscribe(function (res) {
                        var activeMans;
                        if (res) {
                            res.forEach(function (man) {
                                if (man.owner != null)
                                    if (man.owner._id == _this.currUser._id ||
                                        man.shared.map(_this.getId).indexOf(_this.currUser._id) > -1) {
                                        _this.existingManuscript.push(man);
                                    }
                            });
                        }
                    }, function (err) {
                        alert("Manuscripts could not load!");
                    });
                };
                ManuscriptsComponent.prototype.getId = function (usr) {
                    return usr._id;
                };
                ManuscriptsComponent.prototype.setActiveMan = function (man) {
                    this.currManuscript = man;
                    this.setSharableUsers();
                    console.log(man.owner._id);
                    console.log(this.currUser._id);
                    if (man.owner._id == this.currUser._id) {
                        this.isOwner = true;
                    }
                };
                ManuscriptsComponent.prototype.setActivePage = function () {
                    var _this = this;
                    this.mScriptService.getPages({ manuscript: this.currManuscript._id }).subscribe(function (res) {
                        _this.currPages = res;
                    }, function (err) {
                        alert(err);
                    });
                };
                ManuscriptsComponent.prototype.setPage = function (page) {
                    this.activePage = page;
                };
                ManuscriptsComponent.prototype.setSharableUsers = function () {
                    var _this = this;
                    this.allUsers.forEach(function (element) {
                        if (element._id != _this.currManuscript._id &&
                            (_this.currManuscript.shared.indexOf(element._id) == -1)) {
                            _this.shareableUsers.push(element);
                        }
                        _this.shareableUsers.forEach(function (element) {
                        });
                    });
                };
                ManuscriptsComponent.prototype.setActiveManandPages = function (man) {
                    this.setActiveMan(man);
                    this.getPages();
                };
                ManuscriptsComponent.prototype.selectUsr = function (usr) {
                    this.selectedUsr = usr;
                };
                ManuscriptsComponent.prototype.restartMans = function () {
                    this.shareableUsers = [];
                    this.setSharableUsers();
                };
                ManuscriptsComponent.prototype.shareMan = function () {
                    var _this = this;
                    this.currManuscript.shared.push(this.selectedUsr._id);
                    this.mScriptService.updateMan(this.currManuscript).subscribe(function (res) {
                        alert("Manuscript shared succefully!");
                        _this.restartMans();
                    }, function (err) {
                        alert("Something went wrong sharing manuscript");
                    });
                };
                ManuscriptsComponent.prototype.createManuscript = function () {
                    var _this = this;
                    this.newMan.owner = this.currUser._id;
                    this.mScriptService.addManuscript(this.newMan).subscribe(function (res) {
                        alert("Manuscript created successfully!");
                        _this.getExisting();
                    }, function (err) {
                        alert(err._body);
                    });
                };
                ManuscriptsComponent.prototype.getShareableUsers = function () {
                    if (this.selectedUsr == null) {
                        return "Please select user";
                    }
                    else {
                        return this.selectedUsr.name;
                    }
                };
                ManuscriptsComponent.prototype.getCurrUser = function () {
                    var _this = this;
                    this.uService.getLoggedUser().subscribe(function (r) {
                        _this.currUser = r;
                        console.log("loggde in");
                        _this.getExisting();
                    }, function (s) {
                        alert("NO LOGGED USER!!");
                    });
                };
                ManuscriptsComponent.prototype.getPages = function () {
                    var _this = this;
                    var query = { manuscript: this.currManuscript._id };
                    this.mScriptService.getPages(query).subscribe(function (r) {
                        _this.currPages = r;
                    }, function (e) {
                        alert(e + "something went wrong getting pages");
                    });
                };
                ManuscriptsComponent.prototype.alertMessage = function (message) {
                    alert(message);
                };
                ManuscriptsComponent.prototype.selectFiles = function (filesInput) {
                    this.filesToUpload = filesInput.target.files;
                };
                ManuscriptsComponent.prototype.uploadFiles = function () {
                    if (!this.filesToUpload || !this.filesToUpload.length)
                        return;
                    var files = this.filesToUpload;
                    var formData = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        formData.append("uploads[]", files[i], files[i]['name']);
                    }
                    this.mScriptService.uploadPages(formData, this.currManuscript._id).subscribe(function (res) {
                        if (res.success) {
                            alert("added pages successfully!");
                            window.location.reload();
                        }
                    }, function (err) {
                        alert(err);
                    });
                };
                ManuscriptsComponent = __decorate([
                    core_8.Component({
                        moduleId: module.id,
                        selector: 'manuscripts',
                        templateUrl: '../../../../templates/manuscripts.component.html',
                        styleUrls: ['../../../../styles/manuscript.css']
                    }),
                    __metadata("design:paramtypes", [manuscript_service_2.ManuscriptsService, users_service_2.UsersService, tasks_service_2.TasksService])
                ], ManuscriptsComponent);
                return ManuscriptsComponent;
            }());
            exports_17("ManuscriptsComponent", ManuscriptsComponent);
        }
    };
});
System.register("components/users/approveUsers.component", ["@angular/core", "services/users.service"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_9, users_service_3, ApproveUsersComponent;
    return {
        setters: [
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (users_service_3_1) {
                users_service_3 = users_service_3_1;
            }
        ],
        execute: function () {
            ApproveUsersComponent = /** @class */ (function () {
                function ApproveUsersComponent(usersService) {
                    this.usersService = usersService;
                    this.users = [];
                }
                ApproveUsersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var query = { approved: false };
                    this.usersService.getUsers(query)
                        .subscribe(function (res) {
                        if (res) {
                            _this.users = res;
                        }
                        _this.loaded = true;
                    }, function (err) {
                        alert(err);
                    });
                };
                ApproveUsersComponent.prototype.approveUser = function (user) {
                    var _this = this;
                    this.loaded = false;
                    var query = { _id: user._id, approved: true };
                    this.usersService.updateUser(query)
                        .subscribe(function (res) {
                        if (res) {
                            _this.ngOnInit();
                        }
                    }, function (err) {
                        alert(err);
                    });
                };
                ApproveUsersComponent = __decorate([
                    core_9.Component({
                        moduleId: module.id,
                        selector: 'approve-users',
                        templateUrl: '../../../../templates/approveUsers.component.html',
                        styleUrls: ['../../../../styles/approve_users.css']
                    }),
                    __metadata("design:paramtypes", [users_service_3.UsersService])
                ], ApproveUsersComponent);
                return ApproveUsersComponent;
            }());
            exports_18("ApproveUsersComponent", ApproveUsersComponent);
        }
    };
});
System.register("app-routing.module", ["@angular/core", "@angular/router", "components/pages/homePage.component", "components/pages/aboutPage.component", "components/pages/workspacePage.component", "components/pages/manuscripts.component", "components/users/approveUsers.component"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_10, router_1, homePage_component_1, aboutPage_component_1, workspacePage_component_1, manuscripts_component_1, approveUsers_component_1, routes, AppRoutingModule;
    return {
        setters: [
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (homePage_component_1_1) {
                homePage_component_1 = homePage_component_1_1;
            },
            function (aboutPage_component_1_1) {
                aboutPage_component_1 = aboutPage_component_1_1;
            },
            function (workspacePage_component_1_1) {
                workspacePage_component_1 = workspacePage_component_1_1;
            },
            function (manuscripts_component_1_1) {
                manuscripts_component_1 = manuscripts_component_1_1;
            },
            function (approveUsers_component_1_1) {
                approveUsers_component_1 = approveUsers_component_1_1;
            }
        ],
        execute: function () {
            routes = [
                { path: '', redirectTo: '/home', pathMatch: 'full' },
                { path: 'home', component: homePage_component_1.HomePageComponent },
                { path: 'about', component: aboutPage_component_1.AboutPageComponent },
                { path: 'workspace', component: workspacePage_component_1.WorkspacePageComponent },
                { path: 'manuscripts', component: manuscripts_component_1.ManuscriptsComponent },
                { path: 'approve', component: approveUsers_component_1.ApproveUsersComponent },
            ];
            AppRoutingModule = /** @class */ (function () {
                function AppRoutingModule() {
                }
                AppRoutingModule = __decorate([
                    core_10.NgModule({
                        imports: [router_1.RouterModule.forRoot(routes)],
                        exports: [router_1.RouterModule]
                    })
                ], AppRoutingModule);
                return AppRoutingModule;
            }());
            exports_19("AppRoutingModule", AppRoutingModule);
            /*
            Copyright 2017 Google Inc. All Rights Reserved.
            Use of this source code is governed by an MIT-style license that
            can be found in the LICENSE file at http://angular.io/license
            */ 
        }
    };
});
System.register("app.component", ["@angular/core", "services/users.service", "services/window.service", "services/manuscript.service", "services/tasks.service", "models/User"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_11, users_service_4, window_service_2, manuscript_service_3, tasks_service_3, User_1, AppComponent;
    return {
        setters: [
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (users_service_4_1) {
                users_service_4 = users_service_4_1;
            },
            function (window_service_2_1) {
                window_service_2 = window_service_2_1;
            },
            function (manuscript_service_3_1) {
                manuscript_service_3 = manuscript_service_3_1;
            },
            function (tasks_service_3_1) {
                tasks_service_3 = tasks_service_3_1;
            },
            function (User_1_1) {
                User_1 = User_1_1;
            }
        ],
        execute: function () {
            AppComponent = /** @class */ (function () {
                function AppComponent(usersService) {
                    this.usersService = usersService;
                    this.loaded = false;
                    this.isLogged = false;
                    this.init();
                    this.setActiveTab("home");
                }
                AppComponent.prototype.init = function () {
                    this.checkIfLogged();
                };
                AppComponent.prototype.checkIfLogged = function () {
                    var _this = this;
                    this.usersService.getLoggedUser()
                        .subscribe(function (res) {
                        if (res) {
                            _this.isLogged = true;
                            _this.currentUser = res;
                        }
                        _this.loadNavbar();
                        _this.loaded = true;
                    }, function (err) {
                        _this.isLogged = false;
                        _this.currentUser = new User_1.User(null);
                        _this.loaded = true;
                        _this.loadNavbar();
                    });
                };
                AppComponent.prototype.getActiveTab = function (tabName) {
                    return this.activeTab == tabName;
                };
                AppComponent.prototype.setActiveTab = function (tabName) {
                    this.activeTab = tabName;
                };
                AppComponent.prototype.loadNavbar = function () {
                    if (this.isLogged) {
                        this.tabs = [
                            { route: "home", text: "Home" },
                            { route: "about", text: "About" },
                            { route: "workspace", text: "Workspace" },
                            { route: "manuscripts", text: "Manuscripts" }
                        ];
                        if (this.currentUser.role == 'admin') {
                            this.tabs.push({ route: "approve", text: "Approve Users" });
                        }
                    }
                    else {
                        this.tabs = [
                            { route: "home", text: "Home" },
                            { route: "about", text: "About" },
                        ];
                    }
                };
                AppComponent = __decorate([
                    core_11.Component({
                        moduleId: module.id,
                        selector: 'my-app',
                        templateUrl: '/../templates/app.component.html',
                        providers: [users_service_4.UsersService, window_service_2.WindowService, manuscript_service_3.ManuscriptsService, tasks_service_3.TasksService]
                    }),
                    __metadata("design:paramtypes", [users_service_4.UsersService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_20("AppComponent", AppComponent);
        }
    };
});
System.register("components/users/registerUser.component", ["@angular/core", "services/users.service", "models/User"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_12, users_service_5, User_2, RegisterUserComponent;
    return {
        setters: [
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (users_service_5_1) {
                users_service_5 = users_service_5_1;
            },
            function (User_2_1) {
                User_2 = User_2_1;
            }
        ],
        execute: function () {
            RegisterUserComponent = /** @class */ (function () {
                function RegisterUserComponent(usersService) {
                    this.usersService = usersService;
                    this.initUser();
                }
                RegisterUserComponent.prototype.initUser = function () {
                    this.newUser = new User_2.User(null);
                    this.newUser.role = "none";
                    this.passConfirmation = "";
                };
                RegisterUserComponent.prototype.addUser = function (event) {
                    var _this = this;
                    event.preventDefault();
                    if (this.passConfirmation == this.newUser.password) {
                        this.usersService.addUser(this.newUser)
                            .subscribe(function (res) {
                            _this.initUser();
                            alert("User created successfully!");
                        }, function (err) {
                            alert(err._body);
                        });
                    }
                    else {
                        alert("Wrong password confirmation");
                    }
                };
                RegisterUserComponent = __decorate([
                    core_12.Component({
                        moduleId: module.id,
                        selector: 'register-user',
                        templateUrl: '../../../../templates/registerUser.component.html',
                        providers: [],
                        styleUrls: ['../../../../styles/register_user.css']
                    }),
                    __metadata("design:paramtypes", [users_service_5.UsersService])
                ], RegisterUserComponent);
                return RegisterUserComponent;
            }());
            exports_21("RegisterUserComponent", RegisterUserComponent);
        }
    };
});
System.register("components/users/loginUser.component", ["@angular/core", "services/users.service", "models/User"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var core_13, users_service_6, User_3, LoginUserComponent;
    return {
        setters: [
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (users_service_6_1) {
                users_service_6 = users_service_6_1;
            },
            function (User_3_1) {
                User_3 = User_3_1;
            }
        ],
        execute: function () {
            LoginUserComponent = /** @class */ (function () {
                function LoginUserComponent(usersService) {
                    this.usersService = usersService;
                    this.init();
                }
                LoginUserComponent.prototype.init = function () {
                    this.loginUserData = {};
                    this.isLogged = false;
                    this.checkIfLogged();
                };
                LoginUserComponent.prototype.checkIfLogged = function () {
                    var _this = this;
                    this.usersService.getLoggedUser()
                        .subscribe(function (res) {
                        if (res) {
                            _this.isLogged = true;
                            _this.currentUser = res;
                        }
                        _this.loaded = true;
                    }, function (err) {
                        _this.isLogged = false;
                        _this.currentUser = new User_3.User(null);
                        _this.loaded = true;
                    });
                };
                LoginUserComponent.prototype.logout = function () {
                    this.usersService.logOutUser()
                        .subscribe(function (res) {
                        window.location.href = '/';
                    }, function (err) {
                        alert(err._body);
                    });
                };
                // login with the given information in 'this.loginUserData'
                LoginUserComponent.prototype.loginUser = function () {
                    this.usersService.loginUser(this.loginUserData)
                        .subscribe(function (res) {
                        if (res) {
                            window.location.href = '/';
                        }
                    }, function (err) {
                        alert(err._body);
                    });
                };
                LoginUserComponent = __decorate([
                    core_13.Component({
                        moduleId: module.id,
                        selector: 'login-user',
                        templateUrl: '../../../../templates/loginUser.component.html',
                        providers: [],
                        styleUrls: ['../../../../styles/login_user.css']
                    }),
                    __metadata("design:paramtypes", [users_service_6.UsersService])
                ], LoginUserComponent);
                return LoginUserComponent;
            }());
            exports_22("LoginUserComponent", LoginUserComponent);
        }
    };
});
System.register("components/pages/workspace/annotation.component", ["models/Page", "models/Annotation", "models/PageAnnotation", "services/manuscript.service", "services/window.service", "models/FreeDraw", "@angular/core", "underscore"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var Page_1, Annotation_1, PageAnnotation_2, manuscript_service_4, window_service_3, FreeDraw_1, core_14, _, AnnotationComponent;
    return {
        setters: [
            function (Page_1_1) {
                Page_1 = Page_1_1;
            },
            function (Annotation_1_1) {
                Annotation_1 = Annotation_1_1;
            },
            function (PageAnnotation_2_1) {
                PageAnnotation_2 = PageAnnotation_2_1;
            },
            function (manuscript_service_4_1) {
                manuscript_service_4 = manuscript_service_4_1;
            },
            function (window_service_3_1) {
                window_service_3 = window_service_3_1;
            },
            function (FreeDraw_1_1) {
                FreeDraw_1 = FreeDraw_1_1;
            },
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (_4) {
                _ = _4;
            }
        ],
        execute: function () {
            AnnotationComponent = /** @class */ (function () {
                function AnnotationComponent(windowService, manuscriptsService) {
                    this.windowService = windowService;
                    this.manuscriptsService = manuscriptsService;
                    this._window = windowService.nativeWindow;
                }
                AnnotationComponent.prototype.exportCanvas = function () {
                    var ctx = this.freeDrawCanvas.getContext("2d");
                    var afterBlob = function (b) {
                        var f = new File([b], "canvas");
                        this.manuscriptsService.exportCanvas(this.pageAnnotation._id, f).
                            subscribe(function (res) {
                            if (res && res.result == "shechter") {
                                alert("Canvas exported successfully");
                            }
                            else {
                                alert("Error Exporting canvas");
                            }
                        }, function (err) {
                            alert(err);
                        });
                    };
                    ctx.canvas.toBlob(afterBlob.bind(this));
                };
                AnnotationComponent.prototype.toggleFreeDraw = function () {
                    this.isFreeDraw = !this.isFreeDraw;
                    this.shouldHideFreeDrawTab = false;
                };
                AnnotationComponent.prototype.saveAllFreeDraw = function () {
                    //Saves all of the canvas's free draws
                    this.manuscriptsService.updatePageAnnotaion(this.pageAnnotation._id, { freeDraws: this.allFreeDrawLines })
                        .subscribe(function (res) {
                        if (res) {
                            alert('saved!');
                        }
                    }, function (err) {
                        alert(err);
                    });
                };
                AnnotationComponent.prototype.getLineNumber = function () {
                    var num = this.currentFreeDrawLine.num + 1;
                    return "Line " + num.toString;
                };
                AnnotationComponent.prototype.createFreeDrawCanvas = function () {
                    this.freeDrawCanvas = document.getElementById("draw-layer");
                    document.getElementById("draw-layer").onmousedown = this.startFreeDraw.bind(this);
                    document.getElementById("draw-layer").onmousemove = this.duringPaint.bind(this);
                    document.getElementById("draw-layer").onmouseup = this.stopFreeDraw.bind(this);
                    this.ctx = this.freeDrawCanvas.getContext("2d");
                    // Try to load an existing canvas if there is:
                    var existingCanvas = new Image();
                    existingCanvas.src = "/depository/" + this.pageAnnotation._id + "/canvas.png";
                    existingCanvas.onload = function () {
                        if (existingCanvas)
                            this.ctx.drawImage(existingCanvas, 0, 0);
                    }.bind(this);
                };
                AnnotationComponent.prototype.ngOnInit = function () {
                    this._window.anno.reset();
                    this.showingText = false;
                    this.imageElement = document.getElementById('anno-img');
                    this.mainDiv = document.getElementById('main_div');
                    this.isFreeDraw = false;
                    this.textCanvas = document.getElementById("text-layer");
                    this.freeDrawCanvas = document.getElementById("draw-layer");
                    this.isPainting = false;
                    this.ctx = null;
                    this.currentPointInDraw = null;
                    this.annotations = [];
                    this.displayedAnnotations = [];
                    this.allFreeDrawLines = this.pageAnnotation.freeDraws;
                    if (this.pageAnnotation) {
                        this.allFreeDrawLines = this.pageAnnotation.freeDraws;
                    }
                    if (this.allFreeDrawLines.length == 0) {
                        this.doLineExist = false;
                    }
                    else {
                        this.doLineExist = true;
                    }
                    this.currentFreeDrawLine = new FreeDraw_1.FreeDraw();
                };
                AnnotationComponent.prototype.addFreeDrawAnno = function () {
                    //Creates a new line, and checking if maximum was reached
                    this.doLineExist = true;
                    if (this.allFreeDrawLines.length >= 255) {
                        alert("Max number of allFreeDrawLines reached!!");
                    }
                    var lastAnnoNum = this.allFreeDrawLines.length + 1;
                    var newLine = new FreeDraw_1.FreeDraw();
                    newLine.num = lastAnnoNum;
                    newLine.text = "";
                    this.allFreeDrawLines.push(newLine);
                    // making the new line to be the current line
                    this.currentFreeDrawLine = newLine;
                };
                AnnotationComponent.prototype.startFreeDraw = function (event) {
                    this.isPainting = true;
                };
                AnnotationComponent.prototype.selectLine = function (l) {
                    if (!l.points) {
                        l.points = [];
                    }
                    this.currentFreeDrawLine = l;
                };
                AnnotationComponent.prototype.stopFreeDraw = function (event) {
                    this.isPainting = false;
                    this.currentPointInDraw = null;
                };
                AnnotationComponent.prototype.midPointBtw = function (p1, p2) {
                    return {
                        x: p1.x + (p2.x - p1.x) / 2,
                        y: p1.y + (p2.y - p1.y) / 2
                    };
                };
                AnnotationComponent.prototype.duringPaint = function (event) {
                    /**
                     * Chacking if the mouse is down and painting
                     */
                    if (!this.isPainting || !this.currentFreeDrawLine.num || !this.isAnnotator) {
                        return;
                    }
                    else {
                        //recieving the current canvas and context 
                        this.freeDrawCanvas = document.getElementById("draw-layer");
                        this.imageElement = document.getElementById('anno-img');
                        this.ctx = this.freeDrawCanvas.getContext("2d");
                        this.ctx.beginPath();
                        var marginLeft = this.freeDrawCanvas.style.marginLeft.replace("px", "");
                        var marginTop = this.imageElement.style.marginTop.replace("px", "");
                        var rect = this.freeDrawCanvas.getBoundingClientRect();
                        this.ctx.lineWidth = 5;
                        this.ctx.lineJoin = this.ctx.lineCap = 'round';
                        var color = this.currentFreeDrawLine.num.toString(16) + "000";
                        if (this.currentFreeDrawLine.num < 16) {
                            color += "00";
                        }
                        //setting the color by the line number
                        color = "#" + color;
                        this.ctx.fillStyle = color;
                        this.ctx.strokeStyle = color;
                        // End of the move to UI region
                        var relX = (event.clientX - rect.left) / (rect.right - rect.left) * this.freeDrawCanvas.width;
                        var relY = (event.clientY - rect.top) / (rect.bottom - rect.top) * this.freeDrawCanvas.height;
                        var p1 = { x: relX, y: relY };
                        //Adding the point to the coordinates array
                        this.currentFreeDrawLine.points.push(p1);
                        if (this.currentPointInDraw) {
                            //creating a line between this point to next and quadratic curve to the midway.
                            this.ctx.beginPath();
                            this.ctx.moveTo(this.currentPointInDraw.x, this.currentPointInDraw.y);
                            var midPoint = {
                                x: p1.x + (this.currentPointInDraw.x - p1.x) / 2,
                                y: p1.y + (this.currentPointInDraw.y - p1.y) / 2
                            };
                            this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                            this.ctx.lineTo(p1.x, p1.y);
                        }
                        //stroking the actual line and moving the current point to the end of the line 
                        this.currentPointInDraw = p1;
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                };
                AnnotationComponent.prototype.initTextCanvas = function () {
                    this.textCanvas = document.getElementById("text-layer");
                    this.textCanvas.width = this.imageElement.width;
                    this.textCanvas.height = this.imageElement.height;
                    document.getElementById("draw-layer").style.marginTop = this.imageElement.style.marginTop;
                };
                AnnotationComponent.prototype.getTextLayerMarginLeft = function () {
                    if (this.annotationElement)
                        return this.annotationElement.style.marginLeft;
                    return '0px';
                };
                AnnotationComponent.prototype.getTextLayerMarginTop = function () {
                    if (this.annotationElement)
                        return this.annotationElement.style.marginTop;
                    return '0px';
                };
                AnnotationComponent.prototype.getTextLayerMarginWidth = function () {
                    if (this.annotationElement)
                        return this.imageElement.width;
                    return '0px';
                };
                AnnotationComponent.prototype.getTextLayerMarginHeight = function () {
                    if (this.annotationElement)
                        return this.imageElement.height;
                    return '0px';
                };
                AnnotationComponent.prototype.initAnnotations = function () {
                    var _this = this;
                    this.initTextCanvas();
                    // Load every annotation from the DB
                    this.createFreeDrawCanvas();
                    this.pageAnnotation.annotations.forEach(function (a) { return _this.annotations.push(new Annotation_1.Annotation(a)); });
                    this.loadAnnotorious();
                    this.displayAnnotations();
                    this.initHandlers();
                };
                AnnotationComponent.prototype.initHandlers = function () {
                    this._window.anno.addHandler('onAnnotationCreated', function (annotation) {
                        this.annotations.push(Annotation_1.Annotation.copyDisplayedAnnotation(annotation));
                    }.bind(this));
                    this._window.anno.addHandler('onAnnotationRemoved', function (annotation) {
                        var annotations;
                        annotations = this.annotations;
                        this.annotations = _.reject(annotations, function (a) { return a.isEqualToDisplayedAnno(annotation); });
                    }.bind(this));
                    this._window.anno.addHandler('onAnnotationUpdated', function (annotation) {
                        var annotations;
                        annotations = this.annotations;
                        var index = _.findIndex(annotations, function (a) { return a.isEqualToDisplayedAnno(annotation); });
                        this.annotations[index] = Annotation_1.Annotation.copyDisplayedAnnotation(annotation);
                    }.bind(this));
                    // this._window.anno.addHandler('onSelectionStarted', (event)=> {if(annotate_by_click) {anno.stopSelection(); findAnnotationMargins(event, gray_img_element);}});
                };
                AnnotationComponent.prototype.displayAnnotations = function () {
                    var _this = this;
                    // Prevent double loading of annotations
                    if (this.displayedAnnotations.length > 0)
                        return;
                    this.annotations.forEach(function (a) {
                        var displayedAnno = new Annotation_1.DisplayedAnnotation(a, _this.page.image);
                        _this.displayedAnnotations.push(displayedAnno);
                        _this._window.anno.addAnnotation(displayedAnno); // the method that actually adds the annotation to the displayed page
                    });
                };
                AnnotationComponent.prototype.saveAnnotations = function () {
                    if (!this.isAnnotator)
                        return alert('Error: Cannot save. this user is not annotator on this task');
                    this.manuscriptsService.updatePageAnnotaion(this.pageAnnotation._id, { annotations: this.annotations, freeDraws: this.allFreeDrawLines })
                        .subscribe(function (res) {
                        if (res) {
                            alert('saved!');
                        }
                    }, function (err) {
                        alert(err);
                    });
                };
                AnnotationComponent.prototype.loadAnnotorious = function () {
                    this.annoObject = this._window.anno.makeAnnotatable(document.getElementById('anno-img'));
                    this.annotationElement = document.getElementsByClassName('annotorious-annotationlayer')[0];
                };
                /* Show annotation text */
                AnnotationComponent.prototype.loadAnnotationsText = function () {
                    var _this = this;
                    this.initTextCanvas();
                    this.resetDraw("text-layer");
                    this._window.anno.getAnnotations().forEach(function (a) {
                        var pos = _this.getTextPosition(a);
                        _this.draw("text-layer", a.text, pos.left, pos.top);
                    });
                };
                AnnotationComponent.prototype.draw = function (canvasid, text, x, y) {
                    var canvas = document.getElementById(canvasid);
                    var ctx = canvas.getContext('2d');
                    ctx.font = '25px serif';
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 0.3;
                    ctx.fillStyle = 'white';
                    ctx.fillText(text, x, y);
                    ctx.strokeText(text, x, y);
                };
                AnnotationComponent.prototype.resetDraw = function (canvasid) {
                    var canvas = document.getElementById(canvasid);
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, 10000, 10000); // 10,000 is a big enough num of pixels to clear :)
                };
                AnnotationComponent.prototype.removeAnnotationFromArray = function (annos_array, annotation) {
                    var index = annos_array.findIndex(function (cur_anno) { return (cur_anno.text == annotation.text && cur_anno.shapes == annotation.shapes); });
                    annos_array.splice(index, 1); // remove the item from the array
                };
                AnnotationComponent.prototype.addAnnotationToArray = function (annos_array, annotation) {
                    annos_array.push(annotation);
                };
                AnnotationComponent.prototype.editAnnotationInArray = function (annos_array, annotation) {
                    var index = annos_array.findIndex(function (cur_anno) { return cur_anno.shapes == annotation.shapes; });
                    annos_array[index].text = annotation.text;
                };
                // transforms the position from precents to pixels and returns the bottom-left corner
                AnnotationComponent.prototype.getTextPosition = function (annotation) {
                    var x = annotation.shapes[0].geometry.x * this.imageElement.width;
                    var y = (annotation.shapes[0].geometry.y + annotation.shapes[0].geometry.height * 0.7) * this.imageElement.height;
                    return { left: x, top: y };
                };
                AnnotationComponent.prototype.toggleShowText = function () {
                    if (this.showingText) {
                        this.loadAnnotationsText();
                    }
                    this.showingText = !this.showingText; // for the next time the user clicks the button
                };
                AnnotationComponent.prototype.getCollapseTabSign = function () {
                    if (this.shouldHideFreeDrawTab)
                        return '>';
                    else
                        return '<';
                };
                AnnotationComponent.prototype.toggleHideFreeDrawTab = function () {
                    this.shouldHideFreeDrawTab = !this.shouldHideFreeDrawTab;
                };
                __decorate([
                    core_14.Input(),
                    __metadata("design:type", Page_1.Page)
                ], AnnotationComponent.prototype, "page", void 0);
                __decorate([
                    core_14.Input(),
                    __metadata("design:type", PageAnnotation_2.PageAnnotation)
                ], AnnotationComponent.prototype, "pageAnnotation", void 0);
                __decorate([
                    core_14.Input(),
                    __metadata("design:type", Boolean)
                ], AnnotationComponent.prototype, "isAnnotator", void 0);
                AnnotationComponent = __decorate([
                    core_14.Component({
                        moduleId: module.id,
                        selector: 'annotation',
                        templateUrl: '../../../../../templates/annotation.component.html',
                        styleUrls: ['../../../../../styles/workspace.css']
                    }),
                    __metadata("design:paramtypes", [window_service_3.WindowService, manuscript_service_4.ManuscriptsService])
                ], AnnotationComponent);
                return AnnotationComponent;
            }());
            exports_23("AnnotationComponent", AnnotationComponent);
        }
    };
});
System.register("app.module", ["@angular/core", "@angular/platform-browser", "@angular/http", "@angular/forms", "app-routing.module", "@ng-bootstrap/ng-bootstrap", "app.component", "components/users/registerUser.component", "components/users/loginUser.component", "components/pages/homePage.component", "components/pages/aboutPage.component", "components/pages/workspacePage.component", "components/pages/workspace/annotation.component", "components/pages/manuscripts.component", "components/users/approveUsers.component"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var core_15, platform_browser_1, http_4, forms_1, app_routing_module_1, ng_bootstrap_1, app_component_1, registerUser_component_1, loginUser_component_1, homePage_component_2, aboutPage_component_2, workspacePage_component_2, annotation_component_1, manuscripts_component_2, approveUsers_component_2, AppModule;
    return {
        setters: [
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_4_1) {
                http_4 = http_4_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_routing_module_1_1) {
                app_routing_module_1 = app_routing_module_1_1;
            },
            function (ng_bootstrap_1_1) {
                ng_bootstrap_1 = ng_bootstrap_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (registerUser_component_1_1) {
                registerUser_component_1 = registerUser_component_1_1;
            },
            function (loginUser_component_1_1) {
                loginUser_component_1 = loginUser_component_1_1;
            },
            function (homePage_component_2_1) {
                homePage_component_2 = homePage_component_2_1;
            },
            function (aboutPage_component_2_1) {
                aboutPage_component_2 = aboutPage_component_2_1;
            },
            function (workspacePage_component_2_1) {
                workspacePage_component_2 = workspacePage_component_2_1;
            },
            function (annotation_component_1_1) {
                annotation_component_1 = annotation_component_1_1;
            },
            function (manuscripts_component_2_1) {
                manuscripts_component_2 = manuscripts_component_2_1;
            },
            function (approveUsers_component_2_1) {
                approveUsers_component_2 = approveUsers_component_2_1;
            }
        ],
        execute: function () {
            AppModule = /** @class */ (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_15.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            http_4.HttpModule,
                            forms_1.FormsModule,
                            app_routing_module_1.AppRoutingModule,
                            ng_bootstrap_1.NgbModule,
                            ng_bootstrap_1.NgbModule.forRoot()
                        ],
                        declarations: [
                            app_component_1.AppComponent,
                            registerUser_component_1.RegisterUserComponent,
                            loginUser_component_1.LoginUserComponent,
                            homePage_component_2.HomePageComponent,
                            aboutPage_component_2.AboutPageComponent,
                            workspacePage_component_2.WorkspacePageComponent,
                            annotation_component_1.AnnotationComponent,
                            manuscripts_component_2.ManuscriptsComponent,
                            approveUsers_component_2.ApproveUsersComponent
                        ],
                        bootstrap: [app_component_1.AppComponent]
                    })
                ], AppModule);
                return AppModule;
            }());
            exports_24("AppModule", AppModule);
        }
    };
});
System.register("main", ["@angular/platform-browser-dynamic", "app.module", "@angular/core"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var platform_browser_dynamic_1, app_module_1, core_16, platform;
    return {
        setters: [
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            },
            function (core_16_1) {
                core_16 = core_16_1;
            }
        ],
        execute: function () {
            core_16.enableProdMode();
            platform = platform_browser_dynamic_1.platformBrowserDynamic();
            platform.bootstrapModule(app_module_1.AppModule);
        }
    };
});
//# sourceMappingURL=bundle.js.map