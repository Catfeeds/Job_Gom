<div class="index-circle go-on" data-node="goOn">
    <div class="index-title clearfix">
        <h2 class="go-on">不断寻觅<span>Go On</span></h2>
    </div>
    <div class="index-circle-list">
        <ul class="clearfix">
            {{ each goOnData }}
            <li modelid="{{$value.modelid}}">
                <div class="mg-negative">
                    <div class="img scale-small">
                        <a target="_blank" href="{{ topicDomain + $value.id + '.html' }}" >
                            <img src='{{imgpath}}/images/public/img-error.png' data-original="{{ $value.url }}"  onerror="imgError(this, 'm')"/>
                        </a>
                    </div>
                    <div class="text">
                        <a target="_blank" href="{{ topicDomain + $value.id + '.html' }}" class="list-title">{{ $value.name }}</a>
                        <span class="from-title">{{ $value.feedReason||$value.group_name }}</span>
                    </div>
                    <div class="text-icon">
                        <a href="javascript:;"><em class="icon iconn-10"></em>{{ $value.userQuantity }}</a>
                        <a href="javascript:;"><em class="icon iconn-11"></em><span>{{ $value.replyQuantity }}</span></a>
                        <a href="javascript:;"><em class="icon iconn-57"></em><span> {{ $value.topicCollectionQuantity }}</span></a>
                    </div>
                </div>
            </li>
            {{ /each }}
        </ul>
    </div>
</div>
