import React, {PropTypes} from 'react';

const FileSelector = (props) => {
	let display = props.visible ? 'table-cell' : 'none';
	return (
		<div className="file-selector" style={{'display': display}}>
        	<div className="file-picker">
        		<button className="btn selector">
        			<em className="icon-14" style={{
                        marginRight: '8px', 
                        fontWeight: 700
                    }}></em>上传视频
        		</button>
        	</div>
        	<p className="desc">最大上传10G视频文件，格式为mp4、mov、avi、mkv、wmv、flv、rmvb、ts文件
            </p>
            <p className="desc" style={{marginTop: '10px'}}>为让用户达到较好的观看效果，请上传16:9，清晰度较高的片源
            </p>
    	</div>
	)
}

export default FileSelector;
