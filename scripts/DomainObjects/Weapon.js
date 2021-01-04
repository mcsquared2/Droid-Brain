class Weapon{
    constructor(name, skill, damage, crit, range, encumbrance, hardPoints, price, restricted, rarity, qualities, abilities){
        this.Name = name;
        this.Skill = skill;
        this.Damage = damage;
        this.Crit = crit;
        this.Range = range;
        this.Encumbrance = encumbrance;
        this.HardPoints = hardPoints;
        this.Mods = [];
        this.Price = price;
        this.Restricted = restricted;
        this.Rarity = rarity;
        this.Qualities = qualities;
        this.Abilities = abilities; 
    }
}