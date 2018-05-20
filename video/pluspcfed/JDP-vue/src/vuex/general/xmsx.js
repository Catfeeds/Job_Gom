const state = {
  xmsxData: {
    filterTypeList: []
  },
  visited: false,
  filter: {
    centerName: '',  
    centerId: 0,    // 中心 id
    departId: 0,    // 部门 id
    departName: '',
    filterCenter: false,
    filterDepartment: false,
    typeId: 0,  // 类型 id
    typeName: '',
    filterType: false,
    stateId: 0,  // 阶段 id
    stateName: '',
    filterState: false,
    riskId: 0,  // 风险 id
    riskName: '',
    filterRisk: false,
    projectId: 0,  // 状态 id
    projectName: '',
    filterProject: false
  }
};

const mutations = {
  getXmsxData(state, data){
    data['center'].pop();//去掉项目管理部
    state.xmsxData.filterTypeList = data;
  },
  changeVisited(state){
    state.visited = true;
  },
  filterCenter(context, options){
    state.filter.filterCenter = options.filterCenter;
    state.filter.centerName = options.centerName;
    state.filter.centerId = options.centerId;
  },
  filterDepartment(context, options){
    state.filter.filterDepartment = options.filterDepartment;
    state.filter.departId = options.departId;
    state.filter.departName = options.departName;
  },
  filterType(context, options){
    state.filter.typeId = options.typeId;
    state.filter.typeName = options.typeName;
    state.filter.filterType = options.filterType;
  },
  filterState(context, options){
    state.filter.stateId = options.stateId;
    state.filter.stateName = options.stateName;
    state.filter.filterState = options.filterState;
  },
  filterRisk(context, options){
    state.filter.riskId = options.riskId;
    state.filter.riskName = options.riskName;
    state.filter.filterRisk = options.filterRisk;
  },
  filterProject(context, options){
    state.filter.projectId = options.projectId;
    state.filter.projectName = options.projectName;
    state.filter.filterProject = options.filterProject;
  },
  initFilterData(context){
    state.filter.centerName = '';
    state.filter.centerId = 0;
    state.filter.departId = 0;
    state.filter.departName = '';
    state.filter.filterCenter = false;
    state.filter.typeId = 0;
    state.filter.typeName = '';
    state.filter.filterType = false;
    state.filter.stateId = 0;
    state.filter.stateName = '';
    state.filter.filterState = false;
    state.filter.riskId = 0;
    state.filter.riskName = '';
    state.filter.filterRisk = false;
    state.filter.projectId = 0;
    state.filter.projectName = '';
    state.filter.filterProject = false;
    state.visited = false;
  },
  initDepartMents(context){
    state.filter.departId = 0;
    state.filter.departName = '';
    state.filter.filterDepartment = false;
  }
};

const actions = {
  getXmsxData(context, data){
    context.commit('getXmsxData', data);
  },
  changeVisited(context){
    context.commit('changeVisited');
  },
  filterCenter(context, options){
    context.commit('filterCenter', options);
  },
  filterDepartment(context, options){
    context.commit('filterDepartment', options);
  },
  filterType(context, options){
    context.commit('filterType', options);
  },
  filterState(context, options){
    context.commit('filterState', options);
  },
  filterRisk(context, options){
    context.commit('filterRisk', options);
  },
  filterProject(context, options){
    context.commit('filterProject', options);
  },
  initFilterData(context){
    context.commit('initFilterData');
  },
  initDepartMents(context){
    context.commit('initDepartMents');
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
