export const HTTP_REQUERT = 'HTTP_REQUERT';
export const HEADER_TITLE_SETS = 'HEADER_TITLE_SETS';
export const HEADER_BACK_URLS = 'HEADER_BACK_URLS';
export const LIST_SELECT_TO_STRINGS = 'LIST_SELECT_TO_STRINGS';
export const LIST_FILTER_CENTER = 'LIST_FILTER_CENTER';
export const LIST_FILTER_DEPARTMENT = 'LIST_FILTER_DEPARTMENT';
export const LIST_INIT_DEPART_MENTS = 'LIST_INIT_DEPART_MENTS';
export const LIST_FILTER_TYPE = 'LIST_FILTER_TYPE';
export const LIST_FILTER_STATE = 'LIST_FILTER_STATE';
export const LIST_FILTER_RISK = 'LIST_FILTER_RISK';
export const LIST_FILTER_PROJECT = 'LIST_FILTER_PROJECT';
export const ADDUP_CHOICE_TEXT = 'ADDUP_CHOICE_TEXT';
export const DETAIL_SEARCH_RESULT = 'DETAIL_SEARCH_RESULT';

//网络请求动作
export const httpRequest = optionjson => {
  return {
    type: HTTP_REQUERT,
    optionjson
  }
}

//头部标题内容动作
export const headerTitleSets = pathjson => {
  return {
    type: HEADER_TITLE_SETS,
    pathjson
  }
}
//头部返回路径状态判断与储蓄动作
export const headerBackUrls = pathjson => {
  return {
    type: HEADER_BACK_URLS,
    pathjson
  }
}

//筛选列表页点选后返回状态字段
export const listSelectToStrings = datajson => {
  return {
    type: LIST_SELECT_TO_STRINGS,
    datajson
  }
}

//跳转项目详情页面
export const listFilterCenter = datajson => {
  return {
    type: LIST_FILTER_CENTER,
    filter: {
      centerName: datajson.text,
      centerId: datajson.choiceId,
      visited: true,
      filterCenter: true,
    }
  }
}

//点击添加筛选栏目
export const listFilterDepartment = datajson => {
  let dataOption = {
    type: LIST_FILTER_DEPARTMENT,
    filter:{
      departId: datajson.departmentId,
      departName: datajson.text,
      visited: true,
      filterCenter: true,
    }
  };

  return dataOption;
}

//设置初始化部门状态栏目
export const listInitDepartMents = () => {
  return {
    type: LIST_INIT_DEPART_MENTS,
    filter: {
      departId: 0,
      departName: '',
      visited: false
    }
  }
}

//选择类型
export const listFilterType = datajson => {
  return {
    type: LIST_FILTER_TYPE,
    filter: {
      typeId: datajson.choiceId,
      typeName: datajson.text,
      visited: true,
      filterType: true,
    }
  }
}

//选择阶段
export const listFilterState = datajson => {
  return {
    type: LIST_FILTER_STATE,
    filter: {
      stateId: datajson.choiceId,
      stateName: datajson.text,
      visited: true,
      filterState: true,
    }
  }
}

//选择风险类型
export const listFilterRisk = datajson => {
  return {
    type: LIST_FILTER_RISK,
    filter: {
      riskId: datajson.choiceId,
      riskName: datajson.text,
      visited: true,
      filterRisk: true,
    }
  }
}

//选择状态类型
export const listFilterProject = datajson => {
  return {
    type: LIST_FILTER_PROJECT,
    filter: {
      projectId: datajson.choiceId,
      projectName: datajson.text,
      visited: true,
      filterProject: true,
    }
  }
}

//统计筛选选取的choiceText
export const AddupChoiceText = textJson => async (dispatch, getState) => {
  console.log(textJson.centerId)
  dispatch({
    type: ADDUP_CHOICE_TEXT,
    configs: {
      list: [
          {
            to: '/xmsx/option/1',
            text: '选择中心/部门',
            choiceCenter: textJson.centerName,
            choiceId: textJson.centerId,
            choiceDepart: textJson.departName,
          },
          {
            to: '/xmsx/option/2',
            text: '选择类型',
            choiceText: textJson.typeName,
          },
          {
            to: '/xmsx/option/3',
            text: '选择阶段',
            choiceText: textJson.stateName,
          },
          {
            to: '/xmsx/option/4',
            text: '选择风险类型',
            choiceText: textJson.riskName,
          },
          {
            to: '/xmsx/option/5',
            text: '选择状态类型',
            choiceText: textJson.projectName,
          },
      ]
    },
    payload: textJson.payload
  });
}

//传递项目详情id和text
export const detailSearchResult = DetailJson => {
  return {
    type: DETAIL_SEARCH_RESULT,
    projectId: DetailJson.id||'',
    projectName: DetailJson.text
  }
}
