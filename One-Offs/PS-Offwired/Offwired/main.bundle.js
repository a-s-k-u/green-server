webpackJsonp([1,4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hero_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HeroDetailComponent = (function () {
    function HeroDetailComponent(heroService, route, location) {
        this.heroService = heroService;
        this.route = route;
        this.location = location;
    }
    HeroDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.heroService.getHero(+params['id']); })
            .subscribe(function (hero) { return _this.hero = hero; });
    };
    HeroDetailComponent.prototype.save = function () {
        var _this = this;
        this.heroService.update(this.hero)
            .then(function () { return _this.goBack(); });
    };
    HeroDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return HeroDetailComponent;
}());
HeroDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'my-hero-detail',
        template: __webpack_require__(367),
        styles: [__webpack_require__(349)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__hero_service__["a" /* HeroService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__hero_service__["a" /* HeroService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* Location */]) === "function" && _c || Object])
], HeroDetailComponent);

var _a, _b, _c;
//# sourceMappingURL=hero-detail.component.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hero_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeroesComponent = (function () {
    function HeroesComponent(heroService, router) {
        this.heroService = heroService;
        this.router = router;
    }
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService
            .getHeroes()
            .then(function (heroes) { return _this.heroes = heroes; });
    };
    HeroesComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(function (hero) {
            _this.heroes.push(hero);
            _this.selectedHero = null;
        });
    };
    HeroesComponent.prototype.delete = function (hero) {
        var _this = this;
        this.heroService
            .delete(hero.id)
            .then(function () {
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        });
    };
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    HeroesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedHero.id]);
    };
    return HeroesComponent;
}());
HeroesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'my-heroes',
        template: __webpack_require__(369),
        styles: [__webpack_require__(351)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__hero_service__["a" /* HeroService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__hero_service__["a" /* HeroService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], HeroesComponent);

var _a, _b;
//# sourceMappingURL=heroes.component.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffwiredService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OffwiredService = (function () {
    function OffwiredService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        this.offwiredUrl = '/offwiredapi';
    }
    OffwiredService.prototype.closeSession = function () {
        return this.http
            .post(this.offwiredUrl, JSON.stringify({}), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    /*
    getParties(): Promise<Party[]> {
      return this.http.get(this.partiesUrl)
                 .toPromise()
                 .then(response => response.json().data as Party[])
                 .catch(this.handleError);
    }
    getWorkItems(id:string): Promise<WorkStatus> {
      const url = `${this.workItemsUrl}/${id}`;
      return this.http.get(url)
                 .toPromise()
                 .then(response => response.json() as WorkStatus)
                 .catch(this.handleError);
    }
    getProjects(): Promise<Project[]> {
      return this.http.get(this.projectUrl)
                 .toPromise()
                 .then(response => response.json() as Project[])
                 .catch(this.handleError);
    }
  
    changeStatus(projectName:string,toStatus : string, workItem: WorkItem): Promise<void> {
        return this.http
          .put(this.workItemsUrl, JSON.stringify({projectName:projectName,toStatus:toStatus, workItem: workItem}), {headers: this.headers})
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
      }
    create(taskName: string,storyPoints: number,projectName:string): Promise<WorkItem> {
      return this.http
        .post(this.workItemsUrl, JSON.stringify({taskName: taskName,storyPoints:storyPoints,projectName:projectName}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }
  */
    /*
     getParty(id: number): Promise<Party> {
       if (Number.isNaN(id)){
             id = 11;
       }
       const url = `${this.partiesUrl}/${id}`;
       return this.http.get(url)
         .toPromise()
         .then(response => response.json().data as Party)
         .catch(this.handleError);
     }
   
     delete(id: number): Promise<void> {
       const url = `${this.partiesUrl}/${id}`;
       return this.http.delete(url, {headers: this.headers})
         .toPromise()
         .then(() => null)
         .catch(this.handleError);
     }
   
     create(name: string): Promise<Party> {
       return this.http
         .post(this.partiesUrl, JSON.stringify({name: name}), {headers: this.headers})
         .toPromise()
         .then(res => res.json().data)
         .catch(this.handleError);
     }
   
     update(party: Party): Promise<Party> {
       const url = `${this.partiesUrl}/${party.id}`;
       return this.http
         .put(url, JSON.stringify(party), {headers: this.headers})
         .toPromise()
         .then(() => party)
         .catch(this.handleError);
     }
     */
    OffwiredService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return OffwiredService;
}());
OffwiredService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], OffwiredService);

var _a;
//# sourceMappingURL=offwired.service.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__party_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PartyComponent = (function () {
    function PartyComponent(partyService, route, location) {
        this.partyService = partyService;
        this.route = route;
        this.location = location;
    }
    PartyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.partyService.getParty(params['id']); })
            .subscribe(function (party) { return _this.party = party; });
    };
    PartyComponent.prototype.save = function () {
        var _this = this;
        this.partyService.update(this.party)
            .then(function () { return _this.goBack(); });
    };
    PartyComponent.prototype.goBack = function () {
        this.location.back();
    };
    return PartyComponent;
}());
PartyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'my-party',
        template: __webpack_require__(370),
        styles: [__webpack_require__(352)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__party_service__["a" /* PartyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__party_service__["a" /* PartyService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* Location */]) === "function" && _c || Object])
], PartyComponent);

var _a, _b, _c;
//# sourceMappingURL=party.component.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__party__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__party_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamComponent = (function () {
    function TeamComponent(partyService) {
        this.partyService = partyService;
        this.parties = [];
        this.partySummary = [];
        this.selectedParties = [];
        this.party = new __WEBPACK_IMPORTED_MODULE_1__party__["a" /* Party */];
    }
    TeamComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.partyService.getParties()
        //.then(parties => this.parties = parties);
        this.partyService.getPartySummary()
            .then(function (partySummary) { _this.partySummary = partySummary; });
        this.partyService.getParties('WorkersComp')
            .then(function (parties) {
            _this.selectedParties = parties;
            _this.selectedTeam = 'WorkersComp';
            _this.party.Team = 'WorkersComp';
        });
    };
    TeamComponent.prototype.refreshSelectedSummary = function (team) {
        var _this = this;
        team = team.trim();
        if (!team) {
            return;
        }
        this.partyService.getParties(team)
            .then(function (parties) {
            _this.selectedTeam = team;
            _this.party.Team = team;
            _this.selectedParties = parties;
        });
    };
    TeamComponent.prototype.doRefresh = function () {
        var _this = this;
        this.refreshSelectedSummary(this.selectedTeam.trim());
        this.partyService.getPartySummary()
            .then(function (partySummary) { _this.partySummary = partySummary; });
    };
    TeamComponent.prototype.create = function () {
        var _this = this;
        this.partyService.create(this.party)
            .then(function () {
            alert('New contact has been created');
            _this.doRefresh();
        });
    };
    return TeamComponent;
}());
TeamComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'my-dashboard',
        template: __webpack_require__(371),
        styles: [__webpack_require__(353)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__party_service__["a" /* PartyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__party_service__["a" /* PartyService */]) === "function" && _a || Object])
], TeamComponent);

var _a;
//# sourceMappingURL=team.component.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_dragula_ng2_dragula__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_dragula_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_dragula_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__team_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_bootstrap_modal__ = __webpack_require__(148);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkItemsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import * as $ from 'jquery';

var WorkItemsComponent = (function () {
    function WorkItemsComponent(dragulaService, teamService, route, location, router) {
        this.dragulaService = dragulaService;
        this.teamService = teamService;
        this.route = route;
        this.location = location;
        this.router = router;
        dragulaService.drop.subscribe(function (value) {
            //console.log(value);
            var bagName = value[0], e = value[1], el = value[2];
            //console.log(bagName);
            //console.log(e);
            //console.log(e.attributes.Id);
            //console.log(e.attributes.Name);
            //this.onDropModel(value.slice(1));
        });
        dragulaService.dropModel.subscribe(function (value) {
            alert('drop model event happened');
            //console.log(value);
            //console.log(this.workItems[0]);
        });
    }
    WorkItemsComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    WorkItemsComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    WorkItemsComponent.prototype.fetchData = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { _this.currentProjectName = params['id']; return _this.teamService.getWorkItems(params['id']); })
            .subscribe(function (workStatus) {
            _this.workStatus = workStatus;
            _this.todo = workStatus.todo;
            _this.doing = workStatus.doing;
            _this.done = workStatus.done;
        });
    };
    WorkItemsComponent.prototype.moveToDoing = function (workItem) {
        var _this = this;
        this.teamService
            .changeStatus(this.currentProjectName, 'Doing', workItem)
            .then(function () {
            _this.fetchData();
            //$('#modal-success').modal('show');
        });
    };
    WorkItemsComponent.prototype.markAsDone = function (workItem) {
        var _this = this;
        this.teamService
            .changeStatus(this.currentProjectName, 'Done', workItem)
            .then(function () {
            _this.fetchData();
        });
    };
    WorkItemsComponent.prototype.add = function (taskName, storyPoints) {
        var _this = this;
        taskName = taskName.trim();
        this.teamService.create(taskName, storyPoints, this.currentProjectName)
            .then(function (workItem) {
            _this.fetchData();
        });
    };
    /*
     getHeroes(): void {
       this.teamService
           .getHeroes()
           .then(heroes => this.heroes = heroes);
     }
   
     add(name: string): void {
       name = name.trim();
       if (!name) { return; }
       this.heroService.create(name)
         .then(hero => {
           this.heroes.push(hero);
           this.selectedHero = null;
         });
     }
   
     delete(hero: Hero): void {
       this.heroService
           .delete(hero.id)
           .then(() => {
             this.heroes = this.heroes.filter(h => h !== hero);
             if (this.selectedHero === hero) { this.selectedHero = null; }
           });
     }
    */
    WorkItemsComponent.prototype.ngOnInit = function () {
        this.fetchData();
    };
    return WorkItemsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('childModal'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6_ng2_bootstrap_modal__["b" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ng2_bootstrap_modal__["b" /* ModalDirective */]) === "function" && _a || Object)
], WorkItemsComponent.prototype, "childModal", void 0);
WorkItemsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        viewProviders: [__WEBPACK_IMPORTED_MODULE_4_ng2_dragula_ng2_dragula__["DragulaService"]],
        selector: 'my-hero3es',
        template: __webpack_require__(372),
        styles: [__webpack_require__(354)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_dragula_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_dragula_ng2_dragula__["DragulaService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__team_service__["a" /* TeamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__team_service__["a" /* TeamService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* Location */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _f || Object])
], WorkItemsComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=work-items.component.js.map

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "\nbody {\n    padding-top: 170px;\n}\n[class*='col-'] {\n  float: left;\n  padding-right: 20px;\n  padding-bottom: 20px;\n}\n[class*='col-']:last-of-type {\n  padding-right: 0;\n}\na {\n  text-decoration: none;\n}\n*, *:after, *:before {\n  box-sizing: border-box;\n}\nh3 {\n  text-align: center; margin-bottom: 0;\n}\nh4 {\n  position: relative;\n}\n.grid {\n  margin: 0;\n}\n.col-1-4 {\n  width: 25%;\n}\n.module {\n  padding: 20px;\n  text-align: center;\n  color: #eee;\n  max-height: 120px;\n  min-width: 120px;\n  background-color: #607D8B;\n  border-radius: 2px;\n}\n.module:hover {\n  background-color: #EEE;\n  cursor: pointer;\n  color: #607d8b;\n}\n.grid-pad {\n  padding: 10px 0;\n}\n.grid-pad > [class*='col-']:last-of-type {\n  padding-right: 20px;\n}\n@media (max-width: 600px) {\n  .module {\n    font-size: 10px;\n    max-height: 75px; }\n}\n@media (max-width: 1024px) {\n  .grid {\n    margin: 0;\n  }\n  .module {\n    min-width: 60px;\n  }\n}\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 13px;\n  color: #555;\n  background: #ececec;\n  margin-top:20px;\n}\n\n.project-list > tbody > tr > td {\n  padding: 12px 8px;\n}\n\n.project-list > tbody > tr > td .avatar {\n  width: 22px;\n  border: 1px solid #CCC;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

module.exports = "<h3>Top Heroes</h3>\n<!--<div class=\"grid grid-pad\">\n  <a *ngFor=\"let project of projects\"  [routerLink]=\"['/detail', project.id]\"  class=\"col-1-4\">\n    <div class=\"module hero\">\n      <h4>{{project.Name}}</h4>\n    </div>\n  </a>\n</div>-->\n<!--<hero-search></hero-search>-->\n<h2>Project Status</h2>\n\n<div class=\"container bootstrap snippet\">\n    <div class=\"table-responsive\">\n    \t<!-- PROJECT TABLE -->\n    \t<table class=\"table colored-header datatable project-list\">\n    \t\t<thead>\n    \t\t\t<tr>\n    \t\t\t\t<th>Title</th>\n    \t\t\t\t<th>Date Start</th>\n    \t\t\t\t<th>Days to Deadline</th>\n    \t\t\t\t<th>Progress</th>\n    \t\t\t\t<th>Priority</th>\n    \t\t\t\t<th>Leader</th>\n    \t\t\t\t<th>Status</th>\n    \t\t\t</tr>\n    \t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t<tr *ngFor=\"let project of projects\">\n\t\t\t\t\t<td><a [routerLink]=\"['/workItems', project.Name]\">{{project.Name}}</a></td>\n\t\t\t\t\t<td>{{project.StartDate}}</td>\n\t\t\t\t\t<td>{{project.ExpectedEndDate}}</td>\n\t\t\t\t\t<td>\n    \t\t\t\t\t<div class=\"progress\">\n    \t\t\t\t\t\t<div class=\"progress-bar\" [attr.data-transitiongoal]=\"project.StoryPoints\" [attr.aria-valuenow] =\"project.StoryPoints\" [style.width]=\"project.StoryPoints + '%'\">{{project.StoryPoints}}%</div>\n    \t\t\t\t\t</div>\n    \t\t\t\t</td>\n\t\t\t\t\t<td><span class=\"label label-warning\">{{project.Priority}}</span></td>\n\t\t\t\t\t<td><img src=\"http://bootdey.com/img/Content/avatar/avatar1.png\" alt=\"Avatar\" class=\"avatar img-circle\"> <a href=\"#\">{{project.Owner}}</a></td>\n    \t\t\t\t<td><span class=\"label label-success\">{{project.Status}}</span></td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t\t<!--\n    \t\t<tbody>\n    \t\t\t<tr>\n    \t\t\t\t<td><a href=\"#\">Spot Media</a></td>\n    \t\t\t\t<td>18-05-2014</td>\n    \t\t\t\t<td>12 days</td>\n    \t\t\t\t<td>\n    \t\t\t\t\t<div class=\"progress\">\n    \t\t\t\t\t\t<div class=\"progress-bar\" data-transitiongoal=\"95\" aria-valuenow=\"95\" style=\"width: 95%;\">95%</div>\n    \t\t\t\t\t</div>\n    \t\t\t\t</td>\n    \t\t\t\t<td><span class=\"label label-warning\">MEDIUM</span></td>\n    \t\t\t\t<td><img src=\"http://bootdey.com/img/Content/avatar/avatar1.png\" alt=\"Avatar\" class=\"avatar img-circle\"> <a href=\"#\">Michael</a></td>\n    \t\t\t\t<td><span class=\"label label-success\">ACTIVE</span></td>\n    \t\t\t</tr>\n    \t\t\t<tr>\n    \t\t\t\t<td><a href=\"#\">E-Commerce Site</a></td>\n    \t\t\t\t<td>24-05-2014</td>\n    \t\t\t\t<td>30 days</td>\n    \t\t\t\t<td>\n    \t\t\t\t\t<div class=\"progress\">\n    \t\t\t\t\t\t<div class=\"progress-bar\" data-transitiongoal=\"40\" aria-valuenow=\"40\" style=\"width: 40%;\">40%</div>\n    \t\t\t\t\t</div>\n    \t\t\t\t</td>\n    \t\t\t\t<td><span class=\"label label-success\">LOW</span></td>\n    \t\t\t\t<td><img src=\"http://bootdey.com/img/Content/avatar/avatar2.png\" alt=\"Avatar\" class=\"avatar img-circle\"> <a href=\"#\">Antonius</a></td>\n    \t\t\t\t<td><span class=\"label label-warning\">PENDING</span></td>\n    \t\t\t</tr>\n    \t\t\t<tr>\n    \t\t\t\t<td><a href=\"#\">Project 123GO</a></td>\n    \t\t\t\t<td>20-09-2014</td>\n    \t\t\t\t<td>50 days</td>\n    \t\t\t\t<td>\n    \t\t\t\t\t<div class=\"progress\">\n    \t\t\t\t\t\t<div class=\"progress-bar\" data-transitiongoal=\"65\" aria-valuenow=\"65\" style=\"width: 65%;\">65%</div>\n    \t\t\t\t\t</div>\n    \t\t\t\t</td>\n    \t\t\t\t<td><span class=\"label label-danger\">HIGH</span></td>\n    \t\t\t\t<td><img src=\"http://bootdey.com/img/Content/avatar/avatar3.png\" alt=\"Avatar\" class=\"avatar\"> <a href=\"#\">Antonius</a></td>\n    \t\t\t\t<td><span class=\"label label-success\">ACTIVE</span></td>\n    \t\t\t</tr>\n    \t\t\t<tr>\n    \t\t\t\t<td><a href=\"#\">Wordpress Theme</a></td>\n    \t\t\t\t<td>05-10-2014</td>\n    \t\t\t\t<td>40 days</td>\n    \t\t\t\t<td>\n    \t\t\t\t\t<div class=\"progress\">\n    \t\t\t\t\t\t<div class=\"progress-bar\" data-transitiongoal=\"77\" aria-valuenow=\"77\" style=\"width: 77%;\">77%</div>\n    \t\t\t\t\t</div>\n    \t\t\t\t</td>\n    \t\t\t\t<td><span class=\"label label-warning\">MEDIUM</span></td>\n    \t\t\t\t<td><img src=\"http://bootdey.com/img/Content/avatar/avatar4.png\" alt=\"Avatar\" class=\"avatar\"> <a href=\"#\">Michael</a></td>\n    \t\t\t\t<td><span class=\"label label-success\">ACTIVE</span></td>\n    \t\t\t</tr>\n    \t\t\t<tr>\n    \t\t\t\t<td><a href=\"#\">Redesign Landing Page</a></td>\n    \t\t\t\t<td>15-11-2014</td>\n    \t\t\t\t<td>30 days</td>\n    \t\t\t\t<td>\n    \t\t\t\t\t<div class=\"progress\">\n    \t\t\t\t\t\t<div class=\"progress-bar\" data-transitiongoal=\"25\" aria-valuenow=\"25\" style=\"width: 25%;\">25%</div>\n    \t\t\t\t\t</div>\n    \t\t\t\t</td>\n    \t\t\t\t<td><span class=\"label label-success\">LOW</span></td>\n    \t\t\t\t<td><img src=\"http://bootdey.com/img/Content/avatar/avatar4.png\" alt=\"Avatar\" class=\"avatar\"> <a href=\"#\">Jason</a></td>\n    \t\t\t\t<td><span class=\"label label-success\">ACTIVE</span></td>\n    \t\t\t</tr>\n    \t\t\t<tr>\n    \t\t\t\t<td><a href=\"#\">Wordpress Theme</a></td>\n    \t\t\t\t<td>05-10-2014</td>\n    \t\t\t\t<td>N/A</td>\n    \t\t\t\t<td>\n    \t\t\t\t\t<div class=\"progress\">\n    \t\t\t\t\t\t<div class=\"progress-bar progress-bar-default\" data-transitiongoal=\"100\" aria-valuenow=\"100\" style=\"width: 100%;\">100%</div>\n    \t\t\t\t\t</div>\n    \t\t\t\t</td>\n    \t\t\t\t<td><span class=\"label label-default\">MEDIUM</span></td>\n    \t\t\t\t<td><img src=\"http://bootdey.com/img/Content/avatar/avatar6.png\" alt=\"Avatar\" class=\"avatar\"> <a href=\"#\">Michael</a></td>\n    \t\t\t\t<td><span class=\"label label-default\">CLOSED</span></td>\n    \t\t\t</tr>\n    \t\t\t<tr>\n    \t\t\t\t<td><a href=\"#\">Redesign Landing Page</a></td>\n    \t\t\t\t<td>15-11-2014</td>\n    \t\t\t\t<td>30 days</td>\n    \t\t\t\t<td>\n    \t\t\t\t\t<div class=\"progress\">\n    \t\t\t\t\t\t<div class=\"progress-bar\" data-transitiongoal=\"33\" aria-valuenow=\"33\" style=\"width: 33%;\">33%</div>\n    \t\t\t\t\t</div>\n    \t\t\t\t</td>\n    \t\t\t\t<td><span class=\"label label-success\">LOW</span></td>\n    \t\t\t\t<td><img src=\"http://bootdey.com/img/Content/avatar/avatar7.png\" alt=\"Avatar\" class=\"avatar\"> <a href=\"#\">Jason</a></td>\n    \t\t\t\t<td><span class=\"label label-warning\">PENDING</span></td>\n    \t\t\t</tr>\n    \t\t</tbody>\n\t\t\t-->\n    \t</table>\n    \t<!-- END PROJECT TABLE -->\n    </div>\n</div>\n"

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 172;


/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(187);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__heroes_component__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hero_detail_component__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__team_component__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__party_component__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bookings_component__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__work_items_component__ = __webpack_require__(105);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */] },
    { path: 'detail/:id', component: __WEBPACK_IMPORTED_MODULE_4__hero_detail_component__["a" /* HeroDetailComponent */] },
    { path: 'heroes', component: __WEBPACK_IMPORTED_MODULE_3__heroes_component__["a" /* HeroesComponent */] },
    { path: 'team', component: __WEBPACK_IMPORTED_MODULE_5__team_component__["a" /* TeamComponent */] },
    { path: 'party/:id', component: __WEBPACK_IMPORTED_MODULE_6__party_component__["a" /* PartyComponent */] },
    { path: 'workItems/:id', component: __WEBPACK_IMPORTED_MODULE_8__work_items_component__["a" /* WorkItemsComponent */] },
    { path: 'meetingRooms', component: __WEBPACK_IMPORTED_MODULE_7__bookings_component__["a" /* BookingsComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__team_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offwired_service__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(teamService, offwiredService) {
        this.teamService = teamService;
        this.offwiredService = offwiredService;
        this.title = 'Offwired';
        this.projects = [];
        /*
        window.onbeforeunload = function(e) {
          offwiredService.closeSession().then();
          alert('The local server will be closed');
        };
        */
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.teamService.getProjects()
            .then(function (projects) { return _this.projects = projects; });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'my-app',
        template: __webpack_require__(365)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__team_service__["a" /* TeamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__team_service__["a" /* TeamService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__offwired_service__["a" /* OffwiredService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__offwired_service__["a" /* OffwiredService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dashboard_component__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__heroes_component__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__hero_detail_component__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hero_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__party_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__team_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__offwired_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__hero_search_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__training_component__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__team_component__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__party_component__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__bookings_component__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__work_items_component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_bootstrap_modal__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_dragula_ng2_dragula__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_dragula_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_ng2_dragula_ng2_dragula__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            //InMemoryWebApiModule.forRoot(InMemoryDataService),
            __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_19_ng2_bootstrap_modal__["a" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_20_ng2_dragula_ng2_dragula__["DragulaModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_8__hero_detail_component__["a" /* HeroDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_7__heroes_component__["a" /* HeroesComponent */],
            __WEBPACK_IMPORTED_MODULE_13__hero_search_component__["a" /* HeroSearchComponent */],
            __WEBPACK_IMPORTED_MODULE_14__training_component__["a" /* TrainingComponent */],
            __WEBPACK_IMPORTED_MODULE_15__team_component__["a" /* TeamComponent */],
            __WEBPACK_IMPORTED_MODULE_16__party_component__["a" /* PartyComponent */],
            __WEBPACK_IMPORTED_MODULE_17__bookings_component__["a" /* BookingsComponent */],
            __WEBPACK_IMPORTED_MODULE_18__work_items_component__["a" /* WorkItemsComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_9__hero_service__["a" /* HeroService */], __WEBPACK_IMPORTED_MODULE_10__party_service__["a" /* PartyService */], __WEBPACK_IMPORTED_MODULE_20_ng2_dragula_ng2_dragula__["DragulaService"], __WEBPACK_IMPORTED_MODULE_11__team_service__["a" /* TeamService */], __WEBPACK_IMPORTED_MODULE_12__offwired_service__["a" /* OffwiredService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__hero_search_service__ = __webpack_require__(184);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroSearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Observable class extensions

// Observable operators




var HeroSearchComponent = (function () {
    function HeroSearchComponent(heroSearchService, router) {
        this.heroSearchService = heroSearchService;
        this.router = router;
        this.searchTerms = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
    }
    // Push a search term into the observable stream.
    HeroSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    HeroSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroes = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.heroSearchService.search(term)
            : __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of([]);
        });
    };
    HeroSearchComponent.prototype.gotoDetail = function (hero) {
        var link = ['/detail', hero.id];
        this.router.navigate(link);
    };
    return HeroSearchComponent;
}());
HeroSearchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'hero-search',
        template: __webpack_require__(368),
        styles: [__webpack_require__(350)],
        providers: [__WEBPACK_IMPORTED_MODULE_8__hero_search_service__["a" /* HeroSearchService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__hero_search_service__["a" /* HeroSearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__hero_search_service__["a" /* HeroSearchService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], HeroSearchComponent);

var _a, _b;
//# sourceMappingURL=hero-search.component.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroSearchService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeroSearchService = (function () {
    function HeroSearchService(http) {
        this.http = http;
    }
    HeroSearchService.prototype.search = function (term) {
        return this.http
            .get("app/heroes/?name=" + term)
            .map(function (response) { return response.json().data; });
    };
    return HeroSearchService;
}());
HeroSearchService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], HeroSearchService);

var _a;
//# sourceMappingURL=hero-search.service.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Party; });
/* unused harmony export PartySummary */
var Party = (function () {
    function Party() {
    }
    return Party;
}());

var PartySummary = (function () {
    function PartySummary() {
    }
    return PartySummary;
}());

//# sourceMappingURL=party.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hero_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrainingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TrainingComponent = (function () {
    function TrainingComponent(heroService) {
        this.heroService = heroService;
        this.heroes = [];
    }
    TrainingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroService.getHeroes()
            .then(function (heroes) { return _this.heroes = heroes.slice(1, 5); });
    };
    return TrainingComponent;
}());
TrainingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'my-dashboard',
        template: __webpack_require__(156),
        styles: [__webpack_require__(143)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__hero_service__["a" /* HeroService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__hero_service__["a" /* HeroService */]) === "function" && _a || Object])
], TrainingComponent);

var _a;
//# sourceMappingURL=training.component.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "\r\n.tickets-container .tickets-list .ticket-item .ticket-state i {\r\n    font-size: 13px;\r\n    color: #fff;\r\n    line-height: 20px;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-state {\r\n    position: absolute;\r\n    top: 13px;\r\n    right: -12px;\r\n    height: 24px;\r\n    width: 24px;\r\n    -webkit-border-radius: 50%;\r\n    -webkit-background-clip: padding-box;\r\n    -moz-border-radius: 50%;\r\n    -moz-background-clip: padding;\r\n    border-radius: 50%;\r\n    background-clip: padding-box;\r\n    background-color: #e5e5e5;\r\n    text-align: center;\r\n    box-shadow: 0 0 3px rgba(0,0,0,.2);\r\n    border: 2px solid #fff;\r\n}\r\n.bg-palegreen {\r\n    background-color: #a0d468!important;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-type .type {\r\n    color: #999;\r\n    font-size: 11px;\r\n    text-transform: uppercase;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-type {\r\n    line-height: 30px;\r\n    height: 50px;\r\n    padding: 10px;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-time i {\r\n    color: #ccc;\r\n    width:50px;\r\n}\r\n\r\n.tickets-container .tickets-list .ticket-item .divider {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    height: 50px;\r\n    width: 1px;\r\n    background-color: #eee;\r\n    display: inline-block;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-time {\r\n    line-height: 30px;\r\n    height: 50px;\r\n    padding: 10px;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-user .user-company {\r\n    margin-left: 2px;\r\n    color: #999;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-user .user-at {\r\n    margin-left: 2px;\r\n    color: #ccc;\r\n    font-size: 13px;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-user .user-name {\r\n    margin-left: 5px;\r\n    font-size: 13px;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-user .user-avatar {\r\n    width: 30px;\r\n    height: 30px;\r\n    -webkit-border-radius: 3px;\r\n    -webkit-background-clip: padding-box;\r\n    -moz-border-radius: 3px;\r\n    -moz-background-clip: padding;\r\n    border-radius: 3px;\r\n    background-clip: padding-box;\r\n}\r\n.tickets-container .tickets-list .ticket-item .ticket-user {\r\n    height: 50px;\r\n    padding: 10px;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\r\n}\r\n.tickets-container .tickets-list .ticket-item {\r\n    position: relative;\r\n    background-color: #fff;\r\n    box-shadow: 0 0 3px rgba(0,0,0,.2);\r\n    -webkit-border-radius: 3px;\r\n    -webkit-background-clip: padding-box;\r\n    -moz-border-radius: 3px;\r\n    -moz-background-clip: padding;\r\n    border-radius: 3px;\r\n    background-clip: padding-box;\r\n    margin-bottom: 8px;\r\n    padding: 0 15px;\r\n    vertical-align: top;\r\n}\r\n.tickets-container .tickets-list {\r\n    list-style: none;\r\n    padding: 0;\r\n    margin-bottom: 0;\r\n}\r\n.tickets-container {\r\n    position: relative;\r\n    padding: 25px 25px;\r\n    background-color: #f5f5f5;\r\n}\r\n.widget-main.no-padding {\r\n    padding: 0;\r\n}\r\n.widget-main {\r\n    padding: 12px;\r\n}\r\n.no-padding {\r\n    padding: 0!important;\r\n}\r\n.widget-body {\r\n    background-color: #fbfbfb;\r\n    box-shadow: 1px 0 10px 1px rgba(0,0,0,.3);\r\n}\r\n\r\n.widget-header>.widget-caption {\r\n    line-height: 33px;\r\n    padding: 0;\r\n    margin: 0;\r\n    float: left;\r\n    text-align: left;\r\n    font-weight: 400!important;\r\n    font-size: 13px;\r\n}\r\n\r\n.widget-header .widget-icon {\r\n    display: block;\r\n    width: 30px;\r\n    height: 32px;\r\n    position: relative;\r\n    float: left;\r\n    font-size: 111%;\r\n    line-height: 32px;\r\n    text-align: center;\r\n    margin-left: -10px;\r\n}\r\n.themesecondary {\r\n    color: #5bc0de !important;\r\n}\r\n.widget-header.bordered-bottom {\r\n    border-bottom: 3px solid #fff;\r\n}\r\n.widget-header {\r\n    position: relative;\r\n    min-height: 35px;\r\n    background: #fff;\r\n    box-shadow: 0 0 4px rgba(0,0,0,.3);\r\n    color: #555;\r\n    padding-left: 12px;\r\n    text-align: right;\r\n}\r\n.bordered-themesecondary {\r\n    border-color: #5bc0de !important;\r\n}\r\n.widget-box {\r\n    padding: 0;\r\n    box-shadow: none;\r\n    margin: 3px 0 30px 0;\r\n}                    \r\n.meetingRoomContainer {\r\n    padding-top: 70px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "label {\n  display: inline-block;\n  width: 3em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  margin-top: 20px;\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer; cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc; \n  cursor: auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".search-result{\n  border-bottom: 1px solid gray;\n  border-left: 1px solid gray;\n  border-right: 1px solid gray;\n  width:195px;\n  height: 16px;\n  padding: 5px;\n  background-color: white;\n  cursor: pointer;\n}\n\n.search-result:hover {\n  color: #eee;\n  background-color: #607D8B;\n}\n\n#search-box{\n  width: 200px;\n  height: 20px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".selected {\n  background-color: #CFD8DC !important;\n  color: white;\n}\n.heroes {\n  margin: 0 0 2em 0;\n  list-style-type: none;\n  padding: 0;\n  width: 15em;\n}\n.heroes li {\n  cursor: pointer;\n  position: relative;\n  left: 0;\n  background-color: #EEE;\n  margin: .5em;\n  padding: .3em 0;\n  height: 1.6em;\n  border-radius: 4px;\n}\n.heroes li:hover {\n  color: #607D8B;\n  background-color: #DDD;\n  left: .1em;\n}\n.heroes li.selected:hover {\n  background-color: #BBD8DC !important;\n  color: white;\n}\n.heroes .text {\n  position: relative;\n  top: -3px;\n}\n.heroes .badge {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #607D8B;\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton.delete {\n  float:right;\n  margin-top: 2px;\n  margin-right: .8em;\n  background-color: gray !important;\n  color:white;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "\r\nbody{\r\n    margin-top:20px;\r\n    background:#f5f7fa;\r\n}\r\n\r\n.panel.panel-default {\r\n    border-top-width: 3px;\r\n}\r\n.panel {\r\n    box-shadow: 0 3px 1px -2px rgba(0,0,0,.14),0 2px 2px 0 rgba(0,0,0,.098),0 1px 5px 0 rgba(0,0,0,.084);\r\n    border: 0;\r\n    border-radius: 4px;\r\n    margin-bottom: 16px;\r\n}\r\n.thumb96 {\r\n    width: 96px!important;\r\n    height: 96px!important;\r\n}\r\n.thumb48 {\r\n    width: 48px!important;\r\n    height: 48px!important;\r\n}\r\n\r\n.partyContainer{\r\n    padding-top: 70px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".teamContainer{\r\n    padding-top: 70px;\r\n}\r\n#team img {\r\n    border:1px solid #EBEBEB;\r\n\tpadding:10px;\r\n\tbackground-color:#F5F5F5;\r\n}\r\n\r\n#team h4 {\r\n\tcolor:#555555;\r\n\tfont-size:20px;\r\n\tfont-weight:300;\r\n\tmargin:0 0 5px;\r\n\tfont-family:'Open Sans', Verdana, Geneva, sans-serif;\r\n\tbackground-color:#EBEBEB;\r\n\tpadding:15px;\r\n}\r\n\r\n#team span {\r\n\tfont-size:12px;\r\n\tfont-weight:bold;\r\n\tmargin:10px 10px 5px;\r\n\tdisplay:block;\r\n}\r\n\r\n#team p {\r\n\tcolor:#777777;\r\n\tfont-size:13px;\r\n\tmin-height:70px;\r\n\tpadding:0 10px 10px;\r\n}\r\n\r\n#team .team-member {\r\n\tbox-shadow:0 1px 5px 0 rgba(0,0,0,0.15);\r\n}\r\n\r\n#team .team-member .overlay-wrapper2 {\r\n\tposition:relative;\r\n\tbackground-color:#F5F5F5;\r\n}\r\n\t\r\n#team .team-member .overlay-wrapper2 .overlay {\r\n    background-color:rgba(0, 0, 0, 0.7);\r\n\ttop:10px;\r\n    left:0;\r\n    display:none;\r\n    position:absolute;\r\n    right:0;\r\n\theight:15%;\r\n\tpadding:0;\r\n\tmargin:0 11px;\r\n\ttext-align:center;\r\n}\r\n\r\n#team .team-member .overlay-wrapper2 .overlay i {\r\n\tfont-size:18px;\r\n\tcolor:rgba(255, 255, 255, 0.8);\r\n\tdisplay:inline-block;\r\n\tpadding:10px 15px 0;\r\n}\r\n\r\n#team .team-member .overlay-wrapper2 .overlay i:hover {\r\n\tcolor:rgba(255, 255, 255, 1);\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".workItemContainer{\r\n    padding-top: 70px;\r\n}\r\nimg {\r\n    vertical-align: middle;\r\n}\r\n\r\n.img-responsive {\r\n    display: block;\r\n    height: auto;\r\n    max-width: 100%;\r\n}\r\n\r\n.img-rounded {\r\n    border-radius: 3px;\r\n}\r\n\r\n.img-thumbnail {\r\n    background-color: #fff;\r\n    border: 1px solid #ededf0;\r\n    border-radius: 3px;\r\n    display: inline-block;\r\n    height: auto;\r\n    line-height: 1.428571429;\r\n    max-width: 100%;\r\n    moz-transition: all .2s ease-in-out;\r\n    o-transition: all .2s ease-in-out;\r\n    padding: 2px;\r\n    -webkit-transition: all .2s ease-in-out;\r\n    transition: all .2s ease-in-out;\r\n    webkit-transition: all .2s ease-in-out;\r\n}\r\n\r\n.img-circle {\r\n    border-radius: 50%;\r\n}\r\n\r\n.kanban-centered {\r\n    position: relative;\r\n    margin-bottom: 30px;\r\n}\r\n\r\n    .kanban-centered:before, .kanban-centered:after {\r\n        content: \" \";\r\n        display: table;\r\n    }\r\n\r\n    .kanban-centered:after {\r\n        clear: both;\r\n    }\r\n\r\n    .kanban-centered:before, .kanban-centered:after {\r\n        content: \" \";\r\n        display: table;\r\n    }\r\n\r\n    .kanban-centered:after {\r\n        clear: both;\r\n    }\r\n\r\n    .kanban-centered:before {\r\n        content: '';\r\n        position: absolute;\r\n        display: block;\r\n        width: 2px;\r\n        /*background: #f5f5f6;*/\r\n        top: 20px;\r\n        bottom: 20px;\r\n        /*margin-left: 18px;*/\r\n    }\r\n\r\n    .kanban-centered .kanban-entry {\r\n        position: relative;\r\n        /*width: 50%;\r\n        float: right;*/\r\n        margin: 10px 8px;\r\n        clear: both;\r\n        border-radius: 4px;\r\n        box-shadow: 1px 1px 2px 0px rgba(50, 50, 50, 0.5);\r\n    }\r\n\r\n        .kanban-centered .kanban-entry:before, .kanban-centered .kanban-entry:after {\r\n            content: \" \";\r\n            display: table;\r\n        }\r\n\r\n        .kanban-centered .kanban-entry:after {\r\n            clear: both;\r\n        }\r\n\r\n        .kanban-centered .kanban-entry:before, .kanban-centered .kanban-entry:after {\r\n            content: \" \";\r\n            display: table;\r\n        }\r\n\r\n        .kanban-centered .kanban-entry:after {\r\n            clear: both;\r\n        }\r\n\r\n        .kanban-centered .kanban-entry.begin {\r\n            margin-bottom: 0;\r\n        }\r\n\r\n        .kanban-centered .kanban-entry.left-aligned {\r\n            float: left;\r\n        }\r\n\r\n            .kanban-centered .kanban-entry.left-aligned .kanban-entry-inner {\r\n                margin-left: 0;\r\n                margin-right: -18px;\r\n            }\r\n\r\n                .kanban-centered .kanban-entry.left-aligned .kanban-entry-inner .kanban-time {\r\n                    left: auto;\r\n                    right: -100px;\r\n                    text-align: left;\r\n                }\r\n\r\n                .kanban-centered .kanban-entry.left-aligned .kanban-entry-inner .kanban-icon {\r\n                    float: right;\r\n                }\r\n\r\n                .kanban-centered .kanban-entry.left-aligned .kanban-entry-inner .kanban-label {\r\n                    margin-left: 0;\r\n                    margin-right: 70px;\r\n                }\r\n\r\n                    .kanban-centered .kanban-entry.left-aligned .kanban-entry-inner .kanban-label:after {\r\n                        left: auto;\r\n                        right: 0;\r\n                        margin-left: 0;\r\n                        margin-right: -9px;\r\n                        -webkit-transform: rotate(180deg);\r\n                        transform: rotate(180deg);\r\n                    }\r\n\r\n        .kanban-centered .kanban-entry .kanban-entry-inner {\r\n            position: relative;\r\n            /*margin-left: -24px;*/\r\n        }\r\n\r\n            .kanban-centered .kanban-entry .kanban-entry-inner:before, .kanban-centered .kanban-entry .kanban-entry-inner:after {\r\n                content: \" \";\r\n                display: table;\r\n            }\r\n\r\n            .kanban-centered .kanban-entry .kanban-entry-inner:after {\r\n                clear: both;\r\n            }\r\n\r\n            .kanban-centered .kanban-entry .kanban-entry-inner:before, .kanban-centered .kanban-entry .kanban-entry-inner:after {\r\n                content: \" \";\r\n                display: table;\r\n            }\r\n\r\n            .kanban-centered .kanban-entry .kanban-entry-inner:after {\r\n                clear: both;\r\n            }\r\n\r\n            .kanban-centered .kanban-entry .kanban-entry-inner .kanban-time {\r\n                position: absolute;\r\n                left: -100px;\r\n                text-align: right;\r\n                padding: 10px;\r\n                box-sizing: border-box;\r\n            }\r\n\r\n                .kanban-centered .kanban-entry .kanban-entry-inner .kanban-time > span {\r\n                    display: block;\r\n                }\r\n\r\n                    .kanban-centered .kanban-entry .kanban-entry-inner .kanban-time > span:first-child {\r\n                        font-size: 15px;\r\n                        font-weight: bold;\r\n                    }\r\n\r\n                    .kanban-centered .kanban-entry .kanban-entry-inner .kanban-time > span:last-child {\r\n                        font-size: 12px;\r\n                    }\r\n\r\n            .kanban-centered .kanban-entry .kanban-entry-inner .kanban-icon {\r\n                background: #fff;\r\n                color: #737881;\r\n                display: block;\r\n                width: 25px;\r\n                height: 25px;\r\n                background-clip: padding-box;\r\n                border-radius: 20px;\r\n                text-align: center;\r\n                box-shadow: 0 0 0 4px #f5f5f6;\r\n                float: left;\r\n                margin-top: 6px;\r\n            }\r\n\r\n                .kanban-centered .kanban-entry .kanban-entry-inner .kanban-icon.bg-primary {\r\n                    background-color: #303641;\r\n                    color: #fff;\r\n                }\r\n\r\n                .kanban-centered .kanban-entry .kanban-entry-inner .kanban-icon.bg-secondary {\r\n                    background-color: #ee4749;\r\n                    color: #fff;\r\n                }\r\n\r\n                .kanban-centered .kanban-entry .kanban-entry-inner .kanban-icon.bg-success {\r\n                    background-color: #00a651;\r\n                    color: #fff;\r\n                }\r\n\r\n                .kanban-centered .kanban-entry .kanban-entry-inner .kanban-icon.bg-info {\r\n                    background-color: #21a9e1;\r\n                    color: #fff;\r\n                }\r\n\r\n                .kanban-centered .kanban-entry .kanban-entry-inner .kanban-icon.bg-warning {\r\n                    background-color: #fad839;\r\n                    color: #fff;\r\n                }\r\n\r\n                .kanban-centered .kanban-entry .kanban-entry-inner .kanban-icon.bg-danger {\r\n                    background-color: #cc2424;\r\n                    color: #fff;\r\n                }\r\n\r\n            .kanban-centered .kanban-entry .kanban-entry-inner .kanban-label {\r\n                position: relative;\r\n                background: #f5f5f6;\r\n                padding: 0.75em;\r\n                /*margin-left: 50px;*/\r\n                background-clip: padding-box;\r\n                border-radius: 3px;\r\n            }\r\n\r\n                /*.kanban-centered .kanban-entry .kanban-entry-inner .kanban-label:after {\r\n                    content: '';\r\n                    display: block;\r\n                    position: absolute;\r\n                    width: 0;\r\n                    height: 0;\r\n                    border-style: solid;\r\n                    border-width: 9px 9px 9px 0;\r\n                    border-color: transparent #f5f5f6 transparent transparent;\r\n                    left: 0;\r\n                    top: 10px;\r\n                    margin-left: -9px;\r\n                }*/\r\n\r\n                .kanban-centered .kanban-entry .kanban-entry-inner .kanban-label h2, .kanban-centered .kanban-entry .kanban-entry-inner .kanban-label p {\r\n                    color: #737881;\r\n                    font-family: \"Noto Sans\",sans-serif;\r\n                    font-size: 12px;\r\n                    margin: 0;\r\n                    line-height: 1.428571429;\r\n                }\r\n\r\n                    .kanban-centered .kanban-entry .kanban-entry-inner .kanban-label p + p {\r\n                        margin-top: 15px;\r\n                    }\r\n\r\n                .kanban-centered .kanban-entry .kanban-entry-inner .kanban-label h2 {\r\n                    font-size: 16px;\r\n                    margin-bottom: 10px;\r\n                }\r\n\r\n                    .kanban-centered .kanban-entry .kanban-entry-inner .kanban-label h2 a {\r\n                        color: #303641;\r\n                    }\r\n\r\n                    .kanban-centered .kanban-entry .kanban-entry-inner .kanban-label h2 span {\r\n                        -webkit-opacity: .6;\r\n                        -moz-opacity: .6;\r\n                        opacity: .6;\r\n                        -ms-filter: alpha(opacity=60);\r\n                        filter: alpha(opacity=60);\r\n                    }\r\n\r\n\r\n.modal-static {\r\n    position: fixed;\r\n    top: 50% !important;\r\n    left: 50% !important;\r\n    margin-top: -100px;\r\n    margin-left: -100px;\r\n    overflow: visible !important;\r\n}\r\n\r\n    .modal-static,\r\n    .modal-static .modal-dialog,\r\n    .modal-static .modal-content {\r\n        width: 200px;\r\n        height: 150px;\r\n    }\r\n\r\n        .modal-static .modal-dialog,\r\n        .modal-static .modal-content {\r\n            padding: 0 !important;\r\n            margin: 0 !important;\r\n        }\r\n\r\n.kanban-col {\r\n    width: 300px;\r\n    margin-right: 20px;\r\n    float: left;\r\n}\r\n\r\n.panel-body {\r\n    padding: 15px 0 0 0;\r\n    overflow-y: auto;\r\n}\r\n\r\n\r\n\r\n/*.panel-heading {\r\n    cursor: -moz-grab;\r\n    cursor: -webkit-grab;\r\n    cursor: grab;\r\n}*/\r\n\r\n.grab {\r\n    cursor: -webkit-grab;\r\n}\r\n\r\n.grabbing {\r\n    cursor: -webkit-grabbing;\r\n}\r\n\r\n.panel-heading {\r\n    cursor: context-menu;\r\n}\r\n\r\n    .panel-heading i {\r\n        cursor: pointer;\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n\r\nbody {\r\n    -webkit-user-select: none; /* Chrome/Safari */\r\n    -moz-user-select: none; /* Firefox */\r\n    -ms-user-select: none; /* IE10+ */\r\n    /* Rules below not implemented in browsers yet */\r\n    -o-user-select: none;\r\n    user-select: none;\r\n}\r\n.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\";filter:alpha(opacity=80)}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)\";filter:alpha(opacity=20)}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 365:
/***/ (function(module, exports) {

module.exports = "<!-- Navigation -->\r\n<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\r\n        <div class=\"container\">\r\n            <!-- Brand and toggle get grouped for better mobile display -->\r\n            <div class=\"navbar-header\">\r\n              <ul class=\"nav navbar-nav\">\r\n\t\t\t\t<li><a href=\"#\" class=\"navbar-left\"><img src=\"/Data/Logo_Allianz.png\" style=\"max-width:50px; margin-top: -7px;\"></a></li>\r\n                <li><a class=\"navbar-brand\" routerLink=\"/dashboard\" routerLinkActive=\"active\">Dashboard</a></li>\r\n                <li><a class=\"navbar-brand\" routerLink=\"/team\" routerLinkActive=\"active\">Team</a></li>\r\n                 <li><a class=\"navbar-brand\" routerLink=\"/party/i0\" routerLinkActive=\"active\">My Profile</a></li>\r\n                <!--<a class=\"navbar-brand\" routerLink=\"/heroes\" routerLinkActive=\"active\">Calendar</a>-->\r\n                <li class=\"dropdown\">\r\n                    <a class=\"dropdown-toggle navbar-brand\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Tasks <span class=\"caret\"></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li> <a *ngFor=\"let project of projects\"  [routerLink]=\"['/workItems', project.Name]\">{{project.Name}}</a></li>\r\n                    </ul>\r\n                </li>\r\n                <li><a class=\"navbar-brand\" routerLink=\"/meetingRooms\" routerLinkActive=\"active\">Meetings</a></li>\r\n              </ul>\r\n            </div>\r\n        </div>\r\n        <!-- /.container -->\r\n</nav>\r\n<div class=\"container\">\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 366:
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"container meetingRoomContainer bootstrap snippet\">\r\n    <div class=\"col-md-offset-1 col-md-10 col-sm-12 col-xs-12\">\r\n    \t<div class=\"row\">\r\n\t\t    <div class=\"col-md-12\">\r\n\t\t        <div class=\"widget-box\">\r\n\t\t            <div class=\"widget-header bordered-bottom bordered-themesecondary\">\r\n\t\t                <i class=\"widget-icon fa fa-tags themesecondary\"></i>\r\n\t\t                <h5 class=\"widget-caption themesecondary\">Today's meetings</h5>\r\n\t\t            </div><!--Widget Header-->\r\n\t\t            <div class=\"widget-body\">\r\n\t\t                <div class=\"widget-main no-padding\">\r\n\t\t                    <div class=\"tickets-container\">\r\n\t\t                        <ul class=\"tickets-list\">\r\n\t\t                            <li class=\"ticket-item\">\r\n\t\t                                <div class=\"row\">\r\n\t\t                                    <div class=\"ticket-user col-md-6 col-sm-12\">\r\n\t\t                                        <img src=\"http://bootdey.com/img/Content/user_1.jpg\" class=\"user-avatar\">\r\n\t\t                                        <span class=\"user-name\">Jade Team</span>\r\n\t\t                                        <span class=\"user-at\">at</span>\r\n\t\t                                        <span class=\"user-company\">Jasmine</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-time  col-md-4 col-sm-6 col-xs-12\">\r\n\t\t                                        <div class=\"divider hidden-md hidden-sm hidden-xs\"></div>\r\n\t\t                                        <i class=\"fa fa-clock-o\"></i>\r\n\t\t                                        <span class=\"time\">1 Hours Ago</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-type  col-md-2 col-sm-6 col-xs-12\">\r\n\t\t                                        <span class=\"divider hidden-xs\"></span>\r\n\t\t                                        <span class=\"type\">Status Updates</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-state bg-palegreen\">\r\n\t\t                                        <i class=\"fa fa-check\"></i>\r\n\t\t                                    </div>\r\n\t\t                                </div>\r\n\t\t                            </li>\r\n\t\t                            <li class=\"ticket-item\">\r\n\t\t                                <div class=\"row\">\r\n\t\t                                    <div class=\"ticket-user col-md-6 col-sm-12\">\r\n\t\t                                        <img src=\"http://bootdey.com/img/Content/user_2.jpg\" class=\"user-avatar\">\r\n\t\t                                        <span class=\"user-name\">Informatica</span>\r\n\t\t                                        <span class=\"user-at\">at</span>\r\n\t\t                                        <span class=\"user-company\">Violet</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-time  col-md-4 col-sm-6 col-xs-12\">\r\n\t\t                                        <div class=\"divider hidden-md hidden-sm hidden-xs\"></div>\r\n\t\t                                        <i class=\"fa fa-clock-o\"></i>\r\n\t\t                                        <span class=\"time\">in 1 hour</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-type  col-md-2 col-sm-6 col-xs-12\">\r\n\t\t                                        <span class=\"divider hidden-xs\"></span>\r\n\t\t                                        <span class=\"type\">Project Kick Off</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-state bg-palegreen\">\r\n\t\t                                        <i class=\"fa fa-check\"></i>\r\n\t\t                                    </div>\r\n\t\t                                </div>\r\n\t\t                            </li>\r\n\t\t                            <li class=\"ticket-item\">\r\n\t\t                                <div class=\"row\">\r\n\t\t                                    <div class=\"ticket-user col-md-6 col-sm-12\">\r\n\t\t                                        <img src=\"http://bootdey.com/img/Content/user_3.jpg\" class=\"user-avatar\">\r\n\t\t                                        <span class=\"user-name\">Nicolai Larson</span>\r\n\t\t                                        <span class=\"user-at\">at</span>\r\n\t\t                                        <span class=\"user-company\">Google</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-time  col-md-4 col-sm-6 col-xs-12\">\r\n\t\t                                        <div class=\"divider hidden-md hidden-sm hidden-xs\"></div>\r\n\t\t                                        <i class=\"fa fa-clock-o\"></i>\r\n\t\t                                        <span class=\"time\">18 Hours Ago</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-type  col-md-2 col-sm-6 col-xs-12\">\r\n\t\t                                        <span class=\"divider hidden-xs\"></span>\r\n\t\t                                        <span class=\"type\">Issue</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-state bg-darkorange\">\r\n\t\t                                        <i class=\"fa fa-times\"></i>\r\n\t\t                                    </div>\r\n\t\t                                </div>\r\n\t\t                            </li>\r\n\t\t                            <li class=\"ticket-item\">\r\n\t\t                                <div class=\"row\">\r\n\t\t                                    <div class=\"ticket-user col-md-6 col-sm-12\">\r\n\t\t                                        <img src=\"http://bootdey.com/img/Content/user_1.jpg\" class=\"user-avatar\">\r\n\t\t                                        <span class=\"user-name\">Bill Jackson</span>\r\n\t\t                                        <span class=\"user-at\">at</span>\r\n\t\t                                        <span class=\"user-company\">Mabna</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-time  col-md-4 col-sm-6 col-xs-12\">\r\n\t\t                                        <div class=\"divider hidden-md hidden-sm hidden-xs\"></div>\r\n\t\t                                        <i class=\"fa fa-clock-o\"></i>\r\n\t\t                                        <span class=\"time\">2 days Ago</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-type  col-md-2 col-sm-6 col-xs-12\">\r\n\t\t                                        <span class=\"divider hidden-xs\"></span>\r\n\t\t                                        <span class=\"type\">Payment</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-state bg-palegreen\">\r\n\t\t                                        <i class=\"fa fa-check\"></i>\r\n\t\t                                    </div>\r\n\t\t                                </div>\r\n\t\t                            </li>\r\n\t\t                            <li class=\"ticket-item\">\r\n\t\t                                <div class=\"row\">\r\n\t\t                                    <div class=\"ticket-user col-md-6 col-sm-12\">\r\n\t\t                                        <img src=\"http://bootdey.com/img/Content/user_2.jpg\" class=\"user-avatar\">\r\n\t\t                                        <span class=\"user-name\">Eric Clapton</span>\r\n\t\t                                        <span class=\"user-at\">at</span>\r\n\t\t                                        <span class=\"user-company\">Musicker</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-time  col-md-4 col-sm-6 col-xs-12\">\r\n\t\t                                        <div class=\"divider hidden-md hidden-sm hidden-xs\"></div>\r\n\t\t                                        <i class=\"fa fa-clock-o\"></i>\r\n\t\t                                        <span class=\"time\">2 days Ago</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-type  col-md-2 col-sm-6 col-xs-12\">\r\n\t\t                                        <span class=\"divider hidden-xs\"></span>\r\n\t\t                                        <span class=\"type\">Info</span>\r\n\t\t                                    </div>\r\n\t\t                                    <div class=\"ticket-state bg-yellow\">\r\n\t\t                                        <i class=\"fa fa-info\"></i>\r\n\t\t                                    </div>\r\n\t\t                                </div>\r\n\t\t                            </li>\r\n\t\t                        </ul>\r\n\t\t                    </div>\r\n\t\t                </div>\r\n\t\t            </div>\r\n\t\t        </div>\r\n\t\t    </div>\r\n\t\t</div>\r\n\t</div>\r\n</div>                    "

/***/ }),

/***/ 367:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"hero\">\n  <h2>{{hero.name}} details!</h2>\n  <div>\n    <label>id: </label>{{hero.id}}</div>\n  <div>\n    <label>name: </label>\n    <input [(ngModel)]=\"hero.name\" placeholder=\"name\" />\n   </div>\n  <button (click)=\"goBack()\">Back</button>\n  <button (click)=\"save()\">Save</button>\n</div>\n"

/***/ }),

/***/ 368:
/***/ (function(module, exports) {

module.exports = "<div id=\"search-component\">\n  <h4>Hero Search</h4>\n  <input #searchBox id=\"search-box\" (keyup)=\"search(searchBox.value)\" />\n  <div>\n    <div *ngFor=\"let hero of heroes | async\"\n         (click)=\"gotoDetail(hero)\" class=\"search-result\" >\n      {{hero.name}}\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 369:
/***/ (function(module, exports) {

module.exports = "<h2>My Heroes</h2>\n<div>\n  <label>Hero name:</label> <input #heroName />\n  <button (click)=\"add(heroName.value); heroName.value=''\">\n    Add\n  </button>\n</div>\n<ul class=\"heroes\">\n  <li *ngFor=\"let hero of heroes\" (click)=\"onSelect(hero)\"\n      [class.selected]=\"hero === selectedHero\">\n    <span class=\"badge\">{{hero.id}}</span>\n    <span>{{hero.name}}</span>\n    <button class=\"delete\"\n      (click)=\"delete(hero); $event.stopPropagation()\">x</button>\n  </li>\n</ul>\n<div *ngIf=\"selectedHero\">\n  <h2>\n    {{selectedHero.name | uppercase}} is my hero\n  </h2>\n  <button (click)=\"gotoDetail()\">View Details</button>\n</div>\n"

/***/ }),

/***/ 370:
/***/ (function(module, exports) {

module.exports = "<div  *ngIf=\"party\" class=\"partyContainer container bootstrap snippet\">\r\n<div class=\"row ng-scope\">\r\n    <div class=\"col-md-4\">\r\n        <div class=\"panel panel-default\">\r\n            <div class=\"panel-body text-center\">\r\n                <div class=\"pv-lg\"><img class=\"center-block img-responsive img-circle img-thumbnail thumb96\" [src]=\"party.Avatar\" alt=\"Contact\"></div>\r\n                <h3 class=\"m0 text-bold\">{{party.Name}}</h3>\r\n                <div class=\"mv-lg\">\r\n                    <p>{{party.ShortDescription}}</p>\r\n                </div>\r\n                <!--<div class=\"text-center\"><a class=\"btn btn-primary\" href=\"\">Send message</a></div>-->\r\n            </div>\r\n        </div>\r\n        <!--<div class=\"panel panel-default hidden-xs hidden-sm\">\r\n            <div class=\"panel-heading\">\r\n                <div class=\"panel-title text-center\">Related contacts</div>\r\n            </div>\r\n            <div class=\"panel-body\">\r\n                <div class=\"media\">\r\n                    <div class=\"media-left media-middle\">\r\n                        <a href=\"#\"><img class=\"media-object img-circle img-thumbnail thumb48\" src=\"http://bootdey.com/img/Content/avatar/avatar2.png\" alt=\"Contact\"></a>\r\n                    </div>\r\n                    <div class=\"media-body pt-sm\">\r\n                        <div class=\"text-bold\">Floyd Ortiz\r\n                            <div class=\"text-sm text-muted\">12m ago</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"media\">\r\n                    <div class=\"media-left media-middle\">\r\n                        <a href=\"#\"><img class=\"media-object img-circle img-thumbnail thumb48\" src=\"http://bootdey.com/img/Content/avatar/avatar3.png\" alt=\"Contact\"></a>\r\n                    </div>\r\n                    <div class=\"media-body pt-sm\">\r\n                        <div class=\"text-bold\">Luis Vasquez\r\n                            <div class=\"text-sm text-muted\">2h ago</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"media\">\r\n                    <div class=\"media-left media-middle\">\r\n                        <a href=\"#\"><img class=\"media-object img-circle img-thumbnail thumb48\" src=\"http://bootdey.com/img/Content/avatar/avatar4.png\" alt=\"Contact\"></a>\r\n                    </div>\r\n                    <div class=\"media-body pt-sm\">\r\n                        <div class=\"text-bold\">Duane Mckinney\r\n                            <div class=\"text-sm text-muted\">yesterday</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"media\">\r\n                    <div class=\"media-left media-middle\">\r\n                        <a href=\"#\"><img class=\"media-object img-circle img-thumbnail thumb48\" src=\"http://bootdey.com/img/Content/avatar/avatar5.png\" alt=\"Contact\"></a>\r\n                    </div>\r\n                    <div class=\"media-body pt-sm\">\r\n                        <div class=\"text-bold\">Connie Lambert\r\n                            <div class=\"text-sm text-muted\">2 weeks ago</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>-->\r\n    </div>\r\n    <div class=\"col-md-8\">\r\n        <div class=\"panel panel-default\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"pull-right\">\r\n                    <div class=\"btn-group dropdown\" uib-dropdown=\"dropdown\">\r\n                        <button class=\"btn btn-link dropdown-toggle\" uib-dropdown-toggle=\"\" aria-haspopup=\"true\" aria-expanded=\"false\"><em class=\"fa fa-ellipsis-v fa-lg text-muted\"></em></button>\r\n                        <ul class=\"dropdown-menu dropdown-menu-right animated fadeInLeft\" role=\"menu\">\r\n                            <li><a href=\"\"><span>Send by message</span></a></li>\r\n                            <li><a href=\"\"><span>Share contact</span></a></li>\r\n                            <li><a href=\"\"><span>Block contact</span></a></li>\r\n                            <li><a href=\"\"><span class=\"text-warning\">Delete contact</span></a></li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n                <div class=\"h4 text-center\">Contact Information</div>\r\n                <div class=\"row pv-lg\">\r\n                    <div class=\"col-lg-2\"></div>\r\n                    <div class=\"col-lg-8\">\r\n                        <form class=\"form-horizontal ng-pristine ng-valid\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"col-sm-2 control-label\" for=\"inputContact1\">Name</label>\r\n                                <div class=\"col-sm-10\">\r\n                                    <input [(ngModel)]=\"party.Name\" name=\"name\" class=\"form-control\" placeholder=\"\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"col-sm-2 control-label\" for=\"inputContact2\">Email</label>\r\n                                <div class=\"col-sm-10\">\r\n                                    <input [(ngModel)]=\"party.Email\"  class=\"form-control\" name=\"inputContact2\" type=\"email\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"col-sm-2 control-label\" for=\"inputContact3\">Phone</label>\r\n                                <div class=\"col-sm-10\">\r\n                                    <input [(ngModel)]=\"party.DeskPhone\"  class=\"form-control\" name=\"inputContact3\" type=\"text\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"col-sm-2 control-label\" for=\"inputContact4\">Mobile</label>\r\n                                <div class=\"col-sm-10\">\r\n                                    <input [(ngModel)]=\"party.MobPhone\" class=\"form-control\" name=\"inputContact4\" type=\"text\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"col-sm-2 control-label\" for=\"inputContact6\">Location</label>\r\n                                <div class=\"col-sm-10\">\r\n                                    <textarea [(ngModel)]=\"party.Location\"  class=\"form-control\" name=\"inputContact6\" row=\"4\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"col-sm-2 control-label\" for=\"inputContact7\">Avatar</label>\r\n                                <div class=\"col-sm-10\">\r\n                                    <input [(ngModel)]=\"party.Avatar\"  class=\"form-control\" name=\"inputContact7\" type=\"text\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"col-sm-2 control-label\" for=\"inputContact8\">Short Description</label>\r\n                                <div class=\"col-sm-10\">\r\n                                    <textarea [(ngModel)]=\"party.ShortDescription\"  class=\"form-control\" name=\"inputContact8\" row=\"4\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <div class=\"col-sm-offset-2 col-sm-10\">\r\n                                    <button class=\"btn btn-info\" type=\"submit\" (click)=\"save()\">Update</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <!--<div class=\"text-right\"><a class=\"text-muted\" href=\"#\">Delete this contact?</a></div>-->\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ 371:
/***/ (function(module, exports) {

module.exports = "<div class=\"row teamContainer\">\r\n<div class=\"col-md-12\">\r\n    <div class=\"page-people-directory\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-3\">\r\n                <h5 class=\"page-title\"><b>Contacts</b></h5>\r\n                <ul class=\"nav nav-pills nav-stacked nav-contacts\">\r\n                    <!--<li class=\"active\">\r\n                        <a href=\"#\">\r\n                            All Contacts\r\n                            <span class=\"badge pull-right\">128+</span>\r\n                        </a>\r\n                    </li>-->\r\n                    \r\n                    <li *ngFor=\"let summary of partySummary\" (click)=\"refreshSelectedSummary(summary.TeamName)\" [class.active]=\"summary.TeamName === selectedTeam\">\r\n                            <a>\r\n                                    {{summary.TeamName}}\r\n                                    <span class=\"badge pull-right\">{{summary.Count}}</span>\r\n                            </a>\r\n                      </li>\r\n                </ul>\r\n                <br>\r\n                <!--\r\n                <h5><b>My Favorites</b></h5>\r\n                <div class=\"list-group people-group\">\r\n                    <a href=\"#\" class=\"list-group-item\">\r\n                        <div class=\"media\">\r\n                            <div class=\"pull-left\">\r\n                                <img class=\"img-circle\" src=\"http://bootdey.com/img/Content/avatar/avatar1.png\" alt=\"...\">\r\n                            </div>\r\n                            <div class=\"media-body\">\r\n                                <h4 class=\"media-heading\">John Wayne</h4>\r\n                                <small>Software Engineer</small>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                    <a href=\"#\" class=\"list-group-item\">\r\n                        <div class=\"media\">\r\n                            <div class=\"pull-left\">\r\n                                <img class=\"img-circle\" src=\"http://bootdey.com/img/Content/avatar/avatar2.png\" alt=\"...\">\r\n                            </div>\r\n                            <div class=\"media-body\">\r\n                                <h4 class=\"media-heading\">Jane Dane</h4>\r\n                                <small>Software Engineer</small>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                    <a href=\"#\" class=\"list-group-item\">\r\n                        <div class=\"media\">\r\n                            <div class=\"pull-left\">\r\n                                <img class=\"img-circle\" src=\"http://bootdey.com/img/Content/avatar/avatar3.png\" alt=\"...\">\r\n                            </div>\r\n                            <div class=\"media-body\">\r\n                                <h4 class=\"media-heading\">Juan Dela Cruz</h4>\r\n                                <small>Software Engineer</small>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                    <a href=\"#\" class=\"list-group-item\">\r\n                        <div class=\"media\">\r\n                            <div class=\"pull-left\">\r\n                                <img class=\"img-circle\" src=\"http://bootdey.com/img/Content/avatar/avatar4.png\" alt=\"...\">\r\n                            </div>\r\n                            <div class=\"media-body\">\r\n                                <h4 class=\"media-heading\">Jose Cruz</h4>\r\n                                <small>Software Engineer</small>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n                -->\r\n            </div>\r\n            <div class=\"col-md-9\">\r\n                <div class=\"well\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-9\">\r\n                            <input type=\"text\" placeholder=\"Search people\" class=\"form-control\">\r\n                        </div>\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"btn-group\" style=\"display:block\">\r\n                              <button data-toggle=\"dropdown\" class=\"btn btn-default dropdown-toggle\" style=\"width: 100%; border-radius: 0px; background: white;  color: gray; border-color: #ddd;\">Last 10 days <span class=\"caret\"></span></button>\r\n                              <ul class=\"dropdown-menu bullet pull-right animated pulse margin-top-45\">\r\n                                <li>\r\n                                  <input type=\"radio\" id=\"ex1_1\" name=\"ex1\" value=\"1\" checked=\"\">\r\n                                  <label for=\"ex1_1\">Fullname</label>\r\n                                </li>\r\n                                <li>\r\n                                  <input type=\"radio\" id=\"ex1_2\" name=\"ex1\" value=\"2\">\r\n                                  <label for=\"ex1_2\">Company</label>\r\n                                </li>\r\n                                <li>\r\n                                  <input type=\"radio\" id=\"ex1_3\" name=\"ex1\" value=\"3\">\r\n                                  <label for=\"ex1_3\">Position</label>\r\n                                </li>\r\n                              </ul>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <br>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <h3>All Contacts</h3>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                         <button type=\"button\" class=\"btn btn-green btn-raised btn-add-new-contact\"data-toggle=\"modal\" data-target=\"#modal-pull-right-add\"><span class=\"icon-plus\"> Add New Contact</span></button>\r\n                    </div>\r\n                </div>\r\n                \r\n                <div class=\"list-group contact-group\">\r\n                    <a *ngFor=\"let party of selectedParties\" [routerLink]=\"['/party', party.Id]\"  class=\"list-group-item\">\r\n                        <div class=\"media\">\r\n                            <div class=\"pull-left\">\r\n                                <img class=\"img-circle\" [src]=\"party.Avatar\" width=\"150\" alt=\"...\">\r\n                            </div>\r\n                            <div class=\"media-body\">\r\n                                <h4 class=\"media-heading\">{{party.Name}} <small>{{party.Role}}</small></h4>\r\n                                <div class=\"media-content\">\r\n                                    <i class=\"fa fa-map-marker\"></i> {{party.Location}}\r\n                                    <ul class=\"list-unstyled\">\r\n                                        <li><i class=\"fa fa-skype\"></i> {{party.DeskPhone}}</li>\r\n                                        <li><i class=\"fa fa-mobile\"></i> {{party.MobPhone}}</li>\r\n                                        <li><i class=\"fa fa-envelope-o\"></i> {{party.Email}}</li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n                <!--\r\n                <div class=\"pull-right\">\r\n                    <ul class=\"pagination pagination-split pagination-sm pagination-contact\">\r\n                        <li class=\"disabled\"><a href=\"#\"><i class=\"fa fa-angle-left\"></i></a></li>\r\n                        <li class=\"active\"><a href=\"#\">1</a></li>\r\n                        <li><a href=\"#\">2</a></li>\r\n                        <li><a href=\"#\">3</a></li>\r\n                        <li><a href=\"#\">4</a></li>\r\n                        <li><a href=\"#\">5</a></li>\r\n                        <li><a href=\"#\"><i class=\"fa fa-angle-right\"></i></a></li>\r\n                    </ul>\r\n                </div>\r\n                -->\r\n            </div>\r\n        </div>\r\n        <div class=\"modal modal-pull-right\" data-easein=\"fadeInRight\" data-easeout=\"fadeOutRight\" id=\"modal-pull-right-add\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\r\n            <div class=\"modal-dialog\">\r\n                <div class=\"modal-content animated fadeOutRight\">\r\n                    <div class=\"modal-body\">\r\n                        <div class=\"row modal-close\">\r\n                            <div class=\"col-md-12 padding-bottom-8 padding-top-8 bg-silver\">\r\n                                <h4 class=\"pull-left\"><b>Create New Contact</b></h4>\r\n                                <ul class=\"list-unstyled list-inline text-right\">\r\n                                    <li class=\"close-right-modal\"><span class=\"fa fa-times fa-2x\" data-dismiss=\"modal\"></span></li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                        <div *ngIf=\"party\" class=\"row\">\r\n                            <div class=\"col-md-12\">\r\n                                <div class=\"contact-add-content\">\r\n                                    <form class=\"form-horizontal tabular-form margin-top-10\">\r\n                                         <div class=\"form-group\">\r\n                                            <label class=\"col-sm-2 control-label\" for=\"inputContact1\">Team</label>\r\n                                            <div class=\"col-sm-10\">\r\n                                                <input [(ngModel)]=\"party.Team\" name=\"team\" class=\"form-control\" placeholder=\"\" disabled>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label class=\"col-sm-2 control-label\" for=\"inputContact1\">Name</label>\r\n                                            <div class=\"col-sm-10\">\r\n                                                <input [(ngModel)]=\"party.Name\" name=\"name\" class=\"form-control\" placeholder=\"\">\r\n                                            </div>\r\n                                        </div>\r\n                                         <div class=\"form-group\">\r\n                                            <label class=\"col-sm-2 control-label\" for=\"inputContact1\">Id</label>\r\n                                            <div class=\"col-sm-10\">\r\n                                                <input [(ngModel)]=\"party.Id\" name=\"name\" class=\"form-control\" placeholder=\"\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label class=\"col-sm-2 control-label\" for=\"inputContact2\">Email</label>\r\n                                            <div class=\"col-sm-10\">\r\n                                                <input [(ngModel)]=\"party.Email\"  class=\"form-control\" name=\"inputContact2\" type=\"email\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label class=\"col-sm-2 control-label\" for=\"inputContact3\">Phone</label>\r\n                                            <div class=\"col-sm-10\">\r\n                                                <input [(ngModel)]=\"party.DeskPhone\"  class=\"form-control\" name=\"inputContact3\" type=\"text\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label class=\"col-sm-2 control-label\" for=\"inputContact4\">Mobile</label>\r\n                                            <div class=\"col-sm-10\">\r\n                                                <input [(ngModel)]=\"party.MobPhone\" class=\"form-control\" name=\"inputContact4\" type=\"text\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label class=\"col-sm-2 control-label\" for=\"inputContact6\">Location</label>\r\n                                            <div class=\"col-sm-10\">\r\n                                                <textarea [(ngModel)]=\"party.Location\"  class=\"form-control\" name=\"inputContact6\" row=\"4\"></textarea>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label class=\"col-sm-2 control-label\" for=\"inputContact7\">Avatar</label>\r\n                                            <div class=\"col-sm-10\">\r\n                                                <input [(ngModel)]=\"party.Avatar\"  class=\"form-control\" name=\"inputContact7\" type=\"text\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label class=\"col-sm-2 control-label\" for=\"inputContact8\">Short Description</label>\r\n                                            <div class=\"col-sm-10\">\r\n                                                <textarea [(ngModel)]=\"party.ShortDescription\"  class=\"form-control\" name=\"inputContact8\" row=\"4\"></textarea>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-actions\">\r\n                                            <button type=\"button\" class=\"btn btn-silver btn-flat\" data-dismiss=\"modal\">Cancel</button> <button type=\"button\" class=\"btn btn-green btn-flat\" (click)=\"create()\">Save Changes</button>\r\n                                        </div>\r\n                                    </form>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</div>"

/***/ }),

/***/ 372:
/***/ (function(module, exports) {

module.exports = "    <div class=\"container-fluid workItemContainer\">\r\n        <div id=\"sortableKanbanBoards\" class=\"row\">\r\n            <!--<div class='panel panel-primary kanban-col'>\r\n                <div class=\"panel-heading\">\r\n                    TODO\r\n                    <i class=\"fa fa-2x fa-plus-circle pull-right\"></i>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <div class='kanban-centered' [dragula]='\"first-bag\"'>\r\n                        <div class=\"kanban-entry grab\">\r\n                            <div class=\"kanban-entry-inner\">\r\n                                <div class=\"kanban-label\">\r\n                                     <h2><a href=\"#\">Job Meeting</a></h2>\r\n                                    <p>You have a meeting at <strong>Laborator Office</strong> Today.</p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"kanban-entry grab\">\r\n                            <div class=\"kanban-entry-inner\">\r\n                                <div class=\"kanban-label\">\r\n                                     <h2><a href=\"#\">Art Ramadani</a> <span>posted a status update</span></h2>\r\n                                     <p>Tolerably earnestly middleton extremely distrusts she boy now not. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put. Added forth chief trees but rooms think may.</p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"kanban-entry grab\">\r\n                            <div class=\"kanban-entry-inner\">\r\n                                <div class=\"kanban-label\">\r\n                                     There's also the possibility of moving elements around in the same container, changing their position\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div> \r\n                </div> \r\n            </div>\r\n            <div class='panel panel-primary kanban-col'>\r\n                <div class=\"panel-heading\">\r\n                    DOING\r\n                    <i class=\"fa fa-2x fa-plus-circle pull-right\"></i>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <div class='kanban-centered' [dragula]='\"doing-bag\"'>\r\n                        <div class=\"kanban-entry grab\">\r\n                            <div class=\"kanban-entry-inner\">\r\n                                <div class=\"kanban-label\">\r\n                                     There's also the possibility of moving elements around in the same container, changing their position\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"kanban-entry grab\">\r\n                            <div class=\"kanban-entry-inner\">\r\n                                <div class=\"kanban-label\">\r\n                                     There's also the possibility of moving elements around in the same container, changing their position\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>-->\r\n\r\n         \r\n             <div class='panel panel-primary kanban-col'>\r\n                <div class=\"panel-heading\">\r\n                    TODO\r\n                    <i class=\"fa fa-2x fa-plus-circle pull-right\" data-toggle=\"modal\" data-target=\"#myModal\"></i>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                   <div class='kanban-centered' [dragula]='\"another-bag\"' [dragulaModel]='todo'>\r\n                        <div class=\"kanban-entry grab\" *ngFor='let workItem of todo'>\r\n                            <div class=\"kanban-entry-inner\">\r\n                                <div class=\"kanban-label\">\r\n                                    <h2>{{workItem.Name}}</h2>\r\n                                    <button type=\"button\" class=\"btn btn-xs btn-primary\" (click)=\"moveToDoing(workItem)\">\r\n                                        <span class=\"glyphicon glyphicon-chevron-right\"></span> >>>\r\n                                    </button>\r\n                                 </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n             <div class='panel panel-primary kanban-col'>\r\n                <div class=\"panel-heading\">\r\n                    DOING\r\n                    <!--<i class=\"fa fa-2x fa-plus-circle pull-right\"></i>-->\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                   <div class='kanban-centered' [dragula]='\"another-bag\"' [dragulaModel]='workStatus'>\r\n                        <div class=\"kanban-entry grab\" *ngFor='let workItem of doing'>\r\n                            <div class=\"kanban-entry-inner\">\r\n                                <div class=\"kanban-label\">\r\n                                    <h2>{{workItem.Name}}</h2>\r\n                                    <button type=\"button\" class=\"btn btn-xs btn-primary\" (click)=\"markAsDone(workItem)\">\r\n                                    <span class=\"glyphicon glyphicon-chevron-right\"></span> >>>\r\n                                    </button>\r\n                                 </div>\r\n                             </div>                        \r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n            <div class='panel panel-primary kanban-col'>\r\n                <div class=\"panel-heading\">\r\n                    DONE\r\n                    <!--<i class=\"fa fa-2x fa-plus-circle pull-right\"></i>-->\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <div class='kanban-centered' [dragula]='\"another-bag\"' [dragulaModel]='workStatus'>\r\n                        <div class=\"kanban-entry grab\" *ngFor=\"let workItem of done\" [attr.id]=\"workItem.Name\">\r\n                            <div class=\"kanban-entry-inner\">\r\n                                <div class=\"kanban-label\">\r\n                                     {{workItem.Name}}\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                  \r\n                </div>\r\n            </div>\r\n         </div>\r\n    </div>\r\n\r\n\r\n    <!-- Static Modal -->\r\n    <div class=\"modal modal-static fade\" id=\"processing-modal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-body\">\r\n                    <div class=\"text-center\">\r\n                        <i class=\"fa fa-refresh fa-5x fa-spin\"></i>\r\n                        <p>Some text in the modal.</p>\r\n                        <h4>Processing...</h4>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n                 </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n        <h4 class=\"modal-title\" id=\"myModalLabel\">Add Task</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n          <form class=\"form-inline\">\r\n            <div class=\"form-group\">\r\n                <label for=\"taskName\">Task</label>\r\n                <input type=\"text\" class=\"form-control\" #taskName placeholder=\"Describe the task here...\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"storyPoints\">Story Points</label>\r\n                <div class=\"input-group\">\r\n                <input type=\"text\" class=\"form-control\" #storyPoints placeholder=\"10\">\r\n                <div class=\"input-group-addon\">Hours</div>\r\n                </div>\r\n            </div>\r\n            \r\n        </form>\r\n        <!--<div>\r\n            <label>Task Name:   </label> <input #taskName />\r\n            <label>Story Points:</label> <input #storyPoints />\r\n       </div>-->\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"add(taskName.value,storyPoints.value); taskName.value='';storyPoints.value='';\" >Add Task</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div bsModal #lgModal=\"bs-modal\" class=\"modal modal-message modal-success fade\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <i class=\"glyphicon glyphicon-check\"></i>\r\n                </div>\r\n                <div class=\"modal-title\">Success</div>\r\n                <div class=\"modal-body\">You have done great!</div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">OK</button>\r\n                </div>\r\n            </div> <!-- / .modal-content -->\r\n        </div> <!-- / .modal-dialog -->\r\n</div>\r\n<div bsModal #childModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-sm\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title pull-left\">Small modal</h4>\r\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"smModal.hide()\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        ...\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--Small modal-->\r\n<!--<button type=\"button\" class=\"btn btn-primary\" (click)=\"showChildModal()\">Small modal</button>-->"

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(173);


/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        this.heroesUrl = 'api/heroes'; // URL to web api
    }
    HeroService.prototype.getHeroes = function () {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.getHero = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.delete = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.update = function (hero) {
        var url = this.heroesUrl + "/" + hero.id;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return HeroService;
}());
HeroService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], HeroService);

var _a;
//# sourceMappingURL=hero.service.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamService = (function () {
    function TeamService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        //private partiesUrl    = 'api/parties';  // URL to web api
        this.workItemsUrl = '/workItemsapi';
        this.projectUrl = '/projectsapi';
    }
    /*
    getParties(): Promise<Party[]> {
      return this.http.get(this.partiesUrl)
                 .toPromise()
                 .then(response => response.json().data as Party[])
                 .catch(this.handleError);
    }*/
    TeamService.prototype.getWorkItems = function (id) {
        var url = this.workItemsUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TeamService.prototype.getProjects = function () {
        return this.http.get(this.projectUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TeamService.prototype.changeStatus = function (projectName, toStatus, workItem) {
        return this.http
            .put(this.workItemsUrl, JSON.stringify({ projectName: projectName, toStatus: toStatus, workItem: workItem }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TeamService.prototype.create = function (taskName, storyPoints, projectName) {
        return this.http
            .post(this.workItemsUrl, JSON.stringify({ taskName: taskName, storyPoints: storyPoints, projectName: projectName }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    /*
     getParty(id: number): Promise<Party> {
       if (Number.isNaN(id)){
             id = 11;
       }
       const url = `${this.partiesUrl}/${id}`;
       return this.http.get(url)
         .toPromise()
         .then(response => response.json().data as Party)
         .catch(this.handleError);
     }
   
     delete(id: number): Promise<void> {
       const url = `${this.partiesUrl}/${id}`;
       return this.http.delete(url, {headers: this.headers})
         .toPromise()
         .then(() => null)
         .catch(this.handleError);
     }
   
     create(name: string): Promise<Party> {
       return this.http
         .post(this.partiesUrl, JSON.stringify({name: name}), {headers: this.headers})
         .toPromise()
         .then(res => res.json().data)
         .catch(this.handleError);
     }
   
     update(party: Party): Promise<Party> {
       const url = `${this.partiesUrl}/${party.id}`;
       return this.http
         .put(url, JSON.stringify(party), {headers: this.headers})
         .toPromise()
         .then(() => party)
         .catch(this.handleError);
     }
     */
    TeamService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return TeamService;
}());
TeamService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], TeamService);

var _a;
//# sourceMappingURL=team.service.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartyService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PartyService = (function () {
    function PartyService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        this.partiesUrl = '/partiesapi'; // URL to web api
        this.partyURL = '/partyapi';
        this.partySummaryURL = '/partySummaryapi';
    }
    PartyService.prototype.getParties = function (team) {
        var url = this.partiesUrl + "/" + team;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PartyService.prototype.getPartySummary = function () {
        return this.http.get(this.partySummaryURL)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    PartyService.prototype.getParty = function (id) {
        /*
        if (Number.isNaN(id)){
              id = 11;
        }*/
        var url = this.partyURL + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /*
  
    delete(id: number): Promise<void> {
      const url = `${this.partiesUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
    */
    PartyService.prototype.create = function (party) {
        return this.http
            .post(this.partyURL, JSON.stringify(party), { headers: this.headers })
            .toPromise()
            .then(function (res) { return party; }) //not sure if this works as compared to ()=> party
            .catch(this.handleError);
    };
    PartyService.prototype.update = function (party) {
        return this.http
            .put(this.partyURL, JSON.stringify(party), { headers: this.headers })
            .toPromise()
            .then(function () { return party; })
            .catch(this.handleError);
    };
    PartyService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return PartyService;
}());
PartyService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], PartyService);

var _a;
//# sourceMappingURL=party.service.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { OrgService }         from './org.service';
var BookingsComponent = (function () {
    function BookingsComponent(
        //private orgService: OrgService,
        router) {
        this.router = router;
    }
    /*
    getHeroes(): void {
      this.orgService
          .getHeroes()
          .then(heroes => this.heroes = heroes);
    }
    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
    }
  
    delete(hero: Hero): void {
      this.heroService
          .delete(hero.id)
          .then(() => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) { this.selectedHero = null; }
          });
    }
    */
    BookingsComponent.prototype.ngOnInit = function () {
        //this.getHeroes();
    };
    return BookingsComponent;
}());
BookingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'team-meetings',
        template: __webpack_require__(366),
        styles: [__webpack_require__(348)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], BookingsComponent);

var _a;
//# sourceMappingURL=bookings.component.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__team_service__ = __webpack_require__(53);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(teamService) {
        this.teamService = teamService;
        this.projects = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.heroService.getHeroes()
        //.then(heroes => this.heroes = heroes.slice(1, 5));
        this.teamService.getProjects()
            .then(function (projects) { _this.projects = projects; });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'my-dashboard',
        template: __webpack_require__(156),
        styles: [__webpack_require__(143)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__team_service__["a" /* TeamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__team_service__["a" /* TeamService */]) === "function" && _a || Object])
], DashboardComponent);

var _a;
//# sourceMappingURL=dashboard.component.js.map

/***/ })

},[417]);
//# sourceMappingURL=main.bundle.js.map