/**
 * Created by zhangmike on 2017/2/22.
 */
export var textarea = `
            <div class="cmt-user-icon">
              <a href="javascript: void 0;">
                <%if (user.avatar !== ''){ %>
                    <img src="<%=user.avatar%>">
                <%}%>
              </a>
			</div>
			<form class="cmt-user-form">
				<div class="cmt-form">
					<div data-id="talksome" class="cmt-input talksome <%=talkSomeClass%>" role="textbox" aria-controls="input">
					<%=clickPlaceholder%>
					</div>
					<div class="cmt-textarea inputComment <%=inputCommentClass%>" data-id="inputComment">
						<textarea data-id="txtComment" class="cmt-textarea"></textarea>
					</div>
					<div data-id="wordNumberArea" class="cmt-form-action inputComment <%=inputCommentClass%>"></div> 
					</div>
				</div>
			</form>
`;
