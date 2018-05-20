import { init, BP } from './BP';
import { win } from './config';
import { load } from './controller';
// mount global object
// BP.findTagByIntcmp = findTagByIntcmp;
win['BP'] = BP;
// init log
init();
// bind event
load();
