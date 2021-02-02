class Character {
    constructor(
        name, 
        speciesId, 
        careers, 
        soak, 
        woundThreshold, 
        currentWounds, 
        strainThreshold, 
        meleeDefense, 
        rangeDefense,
        brawn, 
        agility, 
        intelligence,
        cunning,
        willpower,
        presence,
        careerSkills,
        skillRanks,
        totalXp,
        availableXp,
        xpHistory,
        credits,
        creditHistory,
        background,
        obligations,
        notes,
        motivation, 
        description){
            this.Name = name;
            this.speciesId = speciesId;
            this.careers = careers;
            this.soak = soak;
            this.woundThreshold = woundThreshold;
            this.currentWounds = currentWounds;
            this.strainThreshold = strainThreshold;
            this.meleeDefense = meleeDefense;
            this.rangeDefense = rangeDefense;
            this.brawn = brawn;
            this.agility = agility;
            this.intelligence = intelligence;
            this.cunning = cunning;
            this.willpower = willpower;
            this.presence = presence;
            this.careerSkills = careerSkills;
            this.skillRanks = skillRanks;
            this.totalXp = totalXp;
            this.availableXp = availableXp;
            this.xpHistory = xpHistory;
            this.credits = credits;
            this.creditHistory = creditHistory;
            this.background = background;
            this.obligations = obligations;
            this.notes = notes;
            this.motivation = motivation;
            this.description = description;
        }
}