import Vue from 'vue';

const state = {
  xmsxData: {
    filterTypeList: []
  },
  visited: false,
  filter: {
    centerName: '',  // 中心 id
    centerId: -1,
    departId: -1,    // 部门 id
    departName: '',
    filterCenter: false,
    typeId: -1,  // 类型 id
    typeName: '',
    filterType: false,
    stateId: -1,  // 阶段 id
    stateName: '',
    filterState: false,
    riskId: -1,  // 风险 id
    riskName: '',
    filterRisk: false,
    projectId: -1,  // 状态 id
    projectName: '',
    filterProject: false
  }
};

const mutations = {
  getXmsxData(state, data){
    state.xmsxData.filterTypeList = data;
  },
  changeVisited(state){
    state.visited = true;
  },
  filterCenter(context, options){
    state.filter.filterCenter = options.filterCenter;
    state.filter.centerName = options.centerName;
    state.filter.centerId = options.centerId;
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
    state.filter.centerId = -1;
    state.filter.departId = -1;
    state.filter.departName = '';
    state.filter.filterCenter = false;
    state.filter.typeId = -1;
    state.filter.typeName = '';
    state.filter.filterType = false;
    state.filter.stateId = -1;
    state.filter.stateName = '';
    state.filter.filterState = false;
    state.filter.riskId = -1;
    state.filter.riskName = '';
    state.filter.filterRisk = false;
    state.filter.projectId = -1;
    state.filter.projectName = '';
    state.filter.filterProject = false;
    state.visited = false;
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
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
