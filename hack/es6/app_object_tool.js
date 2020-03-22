function ObjectCreationTool(paper, custom_object) {
    const tool = new paper.Tool();
    let path; // last path
    let rect;
    let options = {roundedCorners: false}



    tool.onMouseDrag = function (event) {
        if (event.event.button > 0) return;  // only first mouse button

        rect = new paper.Rectangle(event.downPoint, event.point);


        path = new paper.Path.Rectangle(rect);


        // path.fillColor = TOOLS_OPTION_COLORS(getState()).fill
        path.strokeColor = 'black'

        // Remove this path on the next drag event:
        path.removeOnDrag();

    };

    tool.onMouseUp = (event) => {
        console.log("rect created on path")
        let pt = event.downPoint
        custom_object.create(path, paper, event.downPoint, event.point)
        path.remove()
    }
    tool.onActivate = () => {
        console.log('tool activate event')
    }
    tool.onDeactivate = () => {
        console.log('tool deactivate event')
    }
    return tool
}
function CircleTool(paper) {
    const tool = new paper.Tool();
    let path; // last path
    let rect;

    tool.onMouseDrag = function (event) {
        path = new Path.Circle({
            center: event.downPoint,
            radius: (event.downPoint.subtract(event.point)).length,
            fillColor: 'red',
            strokeColor: 'black'
        });

        path.fullySelected=true

        // Remove this path on the next drag event:
        path.removeOnDrag();
    };

    tool.onMouseUp = (event) => {
        if (path)
            path.remove()
        let fillColor = 'blue'
        let radius = (event.downPoint.subtract(event.point)).length
        const TEST_GRADIENT = true
        if (TEST_GRADIENT) {
            fillColor = {
                gradient: {
                    stops: [['yellow', 0.05], ['red', 0.2], ['black', 1]],
                    radial: true
                },
                origin: event.downPoint,
                destination: event.downPoint.add(new Point(radius,radius))
            }
        }
        path = new Path.Circle({
            center: event.downPoint,
            radius,
            fillColor,
            strokeColor: 'black'
        });
    }
    tool.onActivate = () => {
        console.log('circle tool activate event')
    }
    tool.onDeactivate = () => {
        console.log('circle tool deactivate event')
    }
    return tool
}
function BoneTool(paper) {

    const tool = new paper.Tool();
    let path; // last path
    let rect;



    tool.onMouseDrag = function (event) {
        if (event.event.button > 0) return;  // only first mouse button

        rect = new paper.Rectangle(event.downPoint, event.point);


        path = new paper.Path.Rectangle(rect);


        // path.fillColor = TOOLS_OPTION_COLORS(getState()).fill
        path.strokeColor = 'black'

        // Remove this path on the next drag event:
        path.removeOnDrag();

    };

    tool.onMouseUp = (event) => {
        console.log("created on path")
        path.remove()
        let pt = event.downPoint


        let props = {
            strokeColor: "black",
            options : {
                bone: [event.downPoint.x, event.downPoint.y],
                orient:event.delta.angle,
                draw_orient:true
            }

        }
        new BoneClass( paper, props);


        props = {
            strokeColor: "black",
            options : {
                parent: [event.downPoint.x, event.downPoint.y],
                bone: [event.point.x,event.point.y],
                orient:0,
                draw_orient:false
            }

        }
        new BoneClass( paper, props);
        //create custom object
    }
    return tool
}
