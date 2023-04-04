
//------------------------------------------------------------------------------------------------------------------------------------

class LineStyle {
    constructor (type) {
        this.type = type;
        switch (this.type) { // Global Parameters for the brushes
            case "pen":
                this.weight = 1;                    // Base Size
                this.vibration = 0.4;               // Vibration
                this.def = 0.3;                     // Definition
                this.quality = 5;                   // Quality/pressure
                this.opacity = 220;                 // Opacity
                this.step_length = 0.9;             // Base distance between dots
                break;
            case "rotring":
                this.weight = 1;
                this.vibration = 0.1;
                this.def = 0.8;
                this.quality = 15;
                this.opacity = 150;
                this.step_length = 0.6;
                break;
            case "2B":
                this.weight = (0.8);
                this.vibration = 1.5;
                this.def = 0.3;
                this.quality = 10;
                this.opacity = 255;
                this.step_length = 0.4;
                break;
            case "HB":
                this.weight = (0.65);
                this.vibration = 1;
                this.def = 0.5;
                this.quality = 5;
                this.opacity = 150;
                this.step_length = 0.4;
                break;
            case "2H":
                this.weight = (0.7);
                this.vibration = 0.6;
                this.def = 0.5;
                this.quality = 1;
                this.opacity = 130;
                this.step_length = 0.4;
                break;
            case "pencil":
                this.weight = pixel;
                this.vibration = 1;
                this.def = 0.9;
                this.quality = 10;
                this.opacity = 70;
                this.step_length = 0.3;
                break;
            case "charcoal":
                this.weight = 1.7;
                this.vibration = 5;
                this.def = 0.8;
                this.quality = 10;
                this.opacity = 150;
                this.step_length = 0.1;
                break;
            case "spray":
                this.weight = (0.5);
                this.vibration = 20;
                this.quality = 50;
                this.opacity = 180;
                this.step_length = (2);
                this.spray = true;
                break;
        }
    }

    brushvariation () {
        if(this.type == "pen") { // Parameters for bell function, different for each stroke to give variation (pressure simulation)
            this.a = rand(0.35,0.65); this.b = rand(0.7,0.8); this.m1 = 1.3; this.m2 = 0.8; this.c = rand(3.5,5);
        }
        else if(this.type == "rotring") {
            this.a = rand(0.45,0.55); this.b = rand(0.7,0.8); this.m1 = 1.1; this.m2 = 0.9; this.c = rand(3.5,5);
        }
        else if(this.type == "2H" || this.type == "2B" || this.type == "HB") {
            this.a = rand(0.35,0.65); this.b = rand(0.7,0.8); this.m1 = 1.3; this.m2 = 0.8; this.c = rand(3.5,5);
        }
        else if(this.type == "cpencil") {
            this.a = rand(0.35,0.65); this.b = rand(0.7,0.8); this.m1 = 1.2; this.m2 = 0.9; this.c = rand(3.5,5);
        }
        else if(this.type == "charcoal") {
            this.a = rand(0.35,0.65); this.b = rand(0.7,0.8); this.m1 = 1.2; this.m2 = 0.7; this.c = rand(3.5,5);
        }
        else if(this.type == "spray") {
            this.a = rand(0.45,0.55); this.b = rand(0.85,0.9); this.m1 = 0.3; this.m2 = 1.2; this.c = rand(5,7);
        }
    }

    line (x1,y1,x2,y2,tono,scale) {
        // Draw Line Function.
        // Parameters: Start Point (x,y), End Point (x2,y2), Color, Weight (scale)
        push();
        this.difX = x2-x1;
        this.difY = y2-y1;
        this.difM = Math.max(Math.abs(this.difX),Math.abs(this.difY));
        this.x = x1, this.y = y1, this.distance = 0;
        this.scale = scale, this.tono = color(tono),
            this.length = dist(x2,y2,x1,y1);

        // Adjustements and randomisation per stroke
        this.tono.setAlpha(this.opacity); stroke(this.tono);
        this.brushvariation();
        this.randMark = rand(0.1,0.3); this.randMark2 = rand(0.7,0.9);

        for (this.i = 0; this.i <= this.difM/this.step_length*this.scale; this.i++) {

            if (this.spray) { // SPRAY TYPE BRUSHES
                this.vibr = (this.scale*this.vibration*this.bell(0.5,0.9,3,0.2,1))+this.vibration/5*randomGaussian();
                strokeWeight(rand(0.9*this.weight,1.1*this.weight));
                for (this.j = 0; this.j < this.quality; this.j++) {
                    this.randSp = rand(0.9,1.1);
                    this.randX = rand(this.randSp*-this.vibr, this.randSp*this.vibr);
                    this.randY = rand(-1, 1) * sqrt(sq(this.randSp*this.vibr) - this.randX * this.randX);
                    point(this.x + this.randX, this.y + this.randY);
                }
            }
            else { // REST OF BRUSHES
                this.vibr = this.scale*this.vibration*(this.def+(1-this.def)*this.bell(this.a,this.b,5,this.m1,this.m2)*randomGaussian());
                strokeWeight(rand(0.9*this.weight,1.1*this.weight)*this.bell(this.a,this.b,5,this.m1,this.m2));
                if (rand(0,this.quality)>0.4) {
                    point(this.x+0.7*rand(-this.vibr,this.vibr),this.y+rand(-this.vibr,this.vibr));
                }
            }

            this.x_step = map(this.i,0,this.difM/this.step_length*this.scale,0,this.difX);
            this.y_step = map(this.i,0,this.difM/this.step_length*this.scale,0,this.difY);
            this.x = x1 + this.x_step;
            this.y = y1 + this.y_step;
            this.distance = sqrt(sq(this.x_step)+sq(this.y_step));
        }
        pop();
    }
    bell (a,b,c,m1,m2) {  // WEIGHT VARIATION (pressure simulation. a = center of bell, b = size bell, m1 and m2 -> new mapping
        this.graph = (1/(1+pow(Math.abs((this.distance-a*this.length)/(b*this.length/2)),2*c)));
        return map(this.graph,0,1,m1,m2);
    }
}

function rand(e, r) {
    return map(random(), 0, 1, e, r)
}