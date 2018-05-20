<div class="index-circle go-on" data-node="goOn">
  <div class="index-title clearfix">
    <h2 class="title-h2">不断寻觅</h2>
  </div>
  <div class="index-circle-list">
    <ul class="clearfix">
      {{ each goOnData }}
      <li>

          <div class="mg-negative">
            <div class="img scale-small backgroundImg-lit">
              <a href="{{ $value.topicURL }}" target="_blank">
                <img data-original="{{ $value.url }}">
              </a>
            </div>
            <div class="text">
              <a href="{{ $value.topicURL }}" target="_blank">
                <span class="list-title overflow-one">{{ $value.name }}</span>
              </a>
              <span class="from-title overflow-one">{{ $value.feedReason||$value.group_name }}</span>
              <div class="text-icon">
                <a href="{{ $value.topicURL }}" target="_blank">
                  <span class="ticon-like"><i>{{ $value.userQuantity }}</i></span>
                  <span class="ticon-speak"><i>{{ $value.replyQuantity }}</i></span>
                  <span class="ticon-star"><i>{{ $value.topicCollectionQuantity }}</i></span>
                </a>
              </div>
            </div>
          </div>
      </li>
      {{/each}}
    </ul>
  </div>
</div>
