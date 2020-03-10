function deg2rad(d) {
    return d * Math.PI / 180
}

function rad2deg(d) {
    return d * 180 / Math.PI
}

let BoneClass = paper.CompoundPath.extend({
    _class: 'CustomBoneClass', // must have

    initialize: function CustomBoneClass(paper, props = {}) {

        CustomBoneClass.base.call(this, props);
        let {options} = props
        this._options = options
        this._callCreate(options)

    },
    setOptions: function (opt) {   //<---   prop change
        // pass down option object
        this._options = opt; // cache for getOptions call

        this._callCreate(opt); // recreate the custom

    },
    getOptions: function () {   //<---   prop getter
        return this._options
    },

    _callCreate(opt) {
        this.removeChildren()

        const BONE_RADIUS = 12
        let end = new paper.Point(opt.end)
        let path
        path = new paper.Path.Circle({center: end, radius: BONE_RADIUS})
        this.addChild(path)
        let orient = opt.orient

        let x = end.x
        let y = end.y
        let v0 = new paper.Point([x + BONE_RADIUS * Math.cos(deg2rad(0 + orient)), y + BONE_RADIUS * Math.sin(deg2rad(0 + orient))])
        let v1 = new paper.Point([x + BONE_RADIUS * Math.cos(deg2rad(120 + orient)), y + BONE_RADIUS * Math.sin(deg2rad(120 + orient))])
        let v2 = new paper.Point([x + BONE_RADIUS * Math.cos(deg2rad(240 + orient)), y + BONE_RADIUS * Math.sin(deg2rad(240 + orient))])

        path = new paper.Path([v0, v1, v2]);
        path.closed = true;
        this.addChild(path)

        path = new Path.Circle({center:v1,radius:3})
        this.addChild(path)

        path = new Path.Circle({center:v2,radius:3})
        this.addChild(path)

        if (opt.start) {
            let line = new paper.Path.Line(opt.start, opt.end)
            this.addChild(line)
        }
    }
})
