"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var users_service_1 = require("./services/users.service");
var window_service_1 = require("./services/window.service");
var AppComponent = (function () {
    function AppComponent(usersService) {
        this.usersService = usersService;
        this.init();
        this.setActiveTab("home");
    }
    AppComponent.prototype.init = function () {
        this.tabs = [
            { route: "home", text: "Home" },
            { route: "about", text: "About" },
            { route: "workspace", text: "Workspace" },
            { route: "manage-collections", text: "Manage Collections" },
        ];
    };
    AppComponent.prototype.getActiveTab = function (tabName) {
        return this.activeTab == tabName;
    };
    AppComponent.prototype.setActiveTab = function (tabName) {
        this.activeTab = tabName;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: '/../templates/app.component.html',
        providers: [users_service_1.UsersService, window_service_1.WindowService]
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map