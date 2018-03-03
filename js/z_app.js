window.onload = () => {
    
    'use strict';
    
    let j = $w.add_object_single(
        4,
        Tree,{
            x:hW,
            y:hH,
            max:10,
            minl:100,
            maxl:3000,
            dir:null,
            size:1,
            lw:1
        },
        document.getElementById('target'),
        W,H
    );
    $w.loop(true);  
}
var Tree = function(o) {
    this.i = o.i;
    this.x = o.x;
    this.y = o.y;
    this.minl = o.minl;
    this.maxl = o.maxl;
    this.max = o.max;
    this.size = o.size;
    
    this.size -= 0.1;
    
    this.lw = o.lw;//0.3;
    this.count = 0;
    this.ctx = $w.canvas.get(this.i,'ctx');
    
    if (o.dir == null) {
        this.dir = 120 * o.z;
    }else{
        this.dir = o.dir;
    }
}
Tree.prototype.loop = function() {

    GLOBALCOUNT++;
    if (GLOBALCOUNT > GLOBALMAX) {
        $w.clearloop();
    }
    let c = $w.color.random();
    // init a local x,y to hold before we add the new coord
    let x = this.x;
    let y = this.y;

    // set a random whole number +/- 15 degrees
    this.dir += Math.floor(Math.random() * 60) - 30;
    // make sure we are inside a 360 degree coord system
    if (this.dir > 360)this.dir -= 360;
    if (this.dir < 0)this.dir += 360;
    
    // move x,y to the new location and add the result to a temporary variable
    let tmp = $w.motion.motion_set(this.x,this.y,this.dir,(this.minl + Math.random() * this.maxl));
    this.x = tmp[0];
    this.y = tmp[1];
    
    // draw the line
    //this.line(this.i,x,y,this.x,this.y,FCOLOR,3,this.lw-0.3);
    this.line(this.i,x,y,this.x,this.y,c,this.size,this.lw);
    this.lw-=0.03;
    
    if ((Math.random() * 1000) > 600) {
        $w.add_object_single(
            1,
            Tree,{
                x:this.x,
                y:this.y,
                max:this.max,
                minl:this.minl,
                maxl:this.maxl,
                dir:this.dir,
                size:this.size,
                lw:this.lw
            },
            this.i,
            W,H
        );
    }
}
    /**
     * @param {Number}
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {String} color 
     * @param {Number} linewidth
     * @param {Boolean} optional if true the operation allows float point numbers
     * 
     * @returns {Void}
     * */
Tree.prototype.line = function(i,x1,y1,x2,y2,color,linewidth,o,fint) {
        // see fint
        if (typeof fint === 'undefined') {
            x1 = ~~x1;
            y1 = ~~y1;
            x2 = ~~x2;
            y2 = ~~y2;
        }
        if (typeof color === 'undefined') color = _color;
        if (typeof linewidth === 'undefined') linewidth = _linewidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.lineWidth = linewidth;
        this.ctx.strokeStyle = color;
        this.ctx.globalAlpha = o;
        this.ctx.stroke();
        this.ctx.closePath();
}