export class Sliders {
    constructor(){
        this.recruitingDifficulty;

        
        this.proSliderPreset();
    }

    loadSliders(sliders){
        this.recruitingDifficulty = sliders.recruitingDifficulty ? sliders.recruitingDifficulty : 100;
    }

    proSliderPreset(){
        this.recruitingDifficulty = 100;
    }

    collegeSliderPreset(){
        this.recruitingDifficulty = 100;
    }

}