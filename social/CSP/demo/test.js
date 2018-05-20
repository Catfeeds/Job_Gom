var fs = require('fs');




var tpl = {
    "type": 1,
    "id": 1132,
    "title": "问候语",
    "secondLevelMenu": [{
        "type": 2,
        "id": 4466,
        "title": "上午问候语",
        "greetings": [{
            "type": 4,
            "id": 7790,
            "title": "下午好",
            "desc": "下午好！很高兴为您服务~"
        }],
        "thirdLevelMenu": [{
            "type": 3,
            "id": 7790,
            "title": "下午好",
            "desc": "下午好！很高兴为您服务~",
            "greetings": [{
                "type": 4,
                "id": 7790,
                "title": "下午好",
                "desc": "下午好！很高兴为您服务~"
            }]
        }]
    }]
}

var result = [];

for (var i = 0; i < 2000; i++) {
    result.push(tpl);
}


fs.writeFileSync('./test.json', JSON.stringify(result), 'utf-8')