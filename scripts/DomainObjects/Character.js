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
        description,
        appliedHistory){
            this.Name = name;
            this.SpeciesId = speciesId;
            this.Careers = careers;
            this.Soak = soak;
            this.WoundThreshold = woundThreshold;
            this.CurrentWounds = currentWounds;
            this.StrainThreshold = strainThreshold;
            this.MeleeDefense = meleeDefense;
            this.RangeDefense = rangeDefense;
            this.Brawn = brawn;
            this.Agility = agility;
            this.Intelligence = intelligence;
            this.Cunning = cunning;
            this.Willpower = willpower;
            this.Presence = presence;
            this.CareerSkills = careerSkills;
            this.SkillRanks = skillRanks;
            this.TotalXp = totalXp;
            this.AvailableXp = availableXp;
            this.XpHistory = xpHistory;
            this.Credits = credits;
            this.CreditHistory = creditHistory;
            this.Background = background;
            this.Obligations = obligations;
            this.Notes = notes;
            this.Motivation = motivation;
            this.Description = description;
            this.AppliedHistory = appliedHistory;
        }

        ApplyXp(xpGain){
            this.TotalXp += xpGain.Xp;
            this.XpHistory[xpGain.timestamp] = xpGain;
        }

        ApplyCredits(creditGain) {
            this.Credits += creditGain.credits;
            this.CreditHistory[creditGain.timestamp] = creditgain;
        }

        ApplyCondition(condition){
            
        }
}