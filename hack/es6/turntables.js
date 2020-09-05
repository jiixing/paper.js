//https://github.com/jgebhardt/paperjs-demos/blob/master/turntable-spirograph/turntable-spirograph.html
/* config */

//turntables
t1 = new Point (100, 100);
tt1_radius = 15;
t2 = new Point (250, 100);
tt2_radius = 45;

//lever lengths
//turntable-attached legs, up to joint
len1 = 121;
len2 = 117;
//same as above, beyond join
len1b = 99;
len2b = 101;
//top end
len3 = 150;
len4 = 120;

//speeds
speed_1 = 5;
speed_2 = 11;




/* const */

var framecount = 0;
var DEG_RAD = 180/Math.PI;
var init = new Point (200, 200);


/* layout & shapes */

tt1 = new Turntable(t1, tt1_radius);
tt2 = new Turntable(t2, tt2_radius);

var connector1 = new Path.Line(t1, init);
connector1.strokeColor = 'black';
var connector2 = new Path.Line(t2, init);
connector2.strokeColor = 'black';


var connector1b = new Path.Line(t1, init);
connector1b.strokeColor = 'black';
var connector2b = new Path.Line(t2, init);
connector2b.strokeColor = 'black';

var text1 = new PointText(new Point(0,10));
text1.fillColor = 'black';
text1.content = 'fps: n/a';
var text2 = new PointText(new Point(0,30));
text2.fillColor = 'black';

var path = new Path();
path.strokeColor = 'red';


function onFrame(event) {

    tt1.rotate(speed_1);
    tt2.rotate(speed_2);

    pivot1 = tt1.children['pivot'].position;
    pivot2 = tt2.children['pivot'].position;

    joint = conv_point(pivot2, pivot1, len2, len1);

    A = getCrankTarget(pivot1, joint, len1+len1b);
    connector1.firstSegment.point = pivot1;
    connector1.lastSegment.point = A;

    B = getCrankTarget(pivot2, joint, len2+len2b);
    connector2.firstSegment.point = pivot2;
    connector2.lastSegment.point = B;

    sharpie = conv_point(A, B, len3, len4);

    connector1b.firstSegment.point = A;
    connector1b.lastSegment.point = sharpie;
    connector2b.firstSegment.point = B;
    connector2b.lastSegment.point = sharpie;

    path.add(sharpie);
    path.smooth();

    text2.content = 'points: ' + path.segments.length;

    framecount++;
}


/* creates group with turntable, pivot */
function Turntable(position, offset) {

    var tt = new Group();
    record = new Path.Circle(position, 60);
    record.fillColor = '#222';
    tt.addChild(record);

    recordLabel = new Path.Circle(position, 20);
    recordLabel.fillColor = '#555';
    tt.addChild(recordLabel);

    var po = new Point(0, offset);
    pivot = new Path.Circle(position + po , 3);
    pivot.fillColor = '#ddd';
    pivot.name = 'pivot';
    tt.addChild(pivot);

    return tt;
}
function getCrankTarget(start_point, converge_point, len) {
    rad = (converge_point-start_point).angle / DEG_RAD;
    return new Point(len*Math.cos(rad), len*Math.sin(rad)) + start_point;
}

//return convergence Point
function conv_point(p1, p2, l1, l2) {
    hypothenuse = p1.getDistance(p2);
    gamma = Math.acos( (Math.pow(l1, 2) + Math.pow(l2, 2) - Math.pow(hypothenuse, 2)) / ( 2*l1*l2 ));
    alpha = Math.asin( (l1 * Math.sin(gamma) ) / hypothenuse );
    world_angle = (180-(p2-p1).angle) / DEG_RAD;
    z = alpha - world_angle;
    return new Point( l1*Math.cos(z), l1*Math.sin(z) ) + p2;
}


//fps output
setInterval(
    function(){
        if (framecount < 40) {
            path.removeSegments();
        } else {
            text1.content = 'fps: ' + framecount
        }
        framecount = 0;},
    1000);






