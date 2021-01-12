import pyexcel as pe
import re
import json
book = pe.get_book(file_name = "listV9.5.ods")

symbolParser = {
    "a": "<advantage>",
    "t": "<disadvatage>",
    "D": "<ability>",
    "d": "<difficulty>",
    "B": "<boost>",
    "b": "<setback>",
    "x": "<triumph>",
    "C": "<proficiency>",
    "c": "<challenge>",
    "s": "<success>",
    "f": "<failure>",
    "y": "<despair>",
}

symbols = "tDdBbxCcsfy"
# symbolReg = re.compile("aa+|t+|D+|d+|B+|b+|x+|C+|c+|s+|f+|y+")
# ['Front Page, Navigation', 'Q&A + Credits', 'GM Reference Sheet', 'Cheat Sheet', 'Critical Injury Table', 'Character Sheet', 'Weapons', 'Armor', 'Gear and Equipment', 'Customization and Modifications', 'Starships', 'Starship Mods and Weapons', 'Crafting', 'Item Qualitys', 'Talents', 'Skills', 'Characteristics', 'Force Powers', 'Species', 'Specialization Career Skills', 'Version History', 'Oi, dont look up me skirt!']
# ['Critical Injury Table', 'Weapons', 'Armor', 'Gear and Equipment', 'Customization and Modifications', 'Starships', 'Starship Mods and Weapons', 'Item Qualitys', 'Talents', 'Force Powers', 'Species', 'Specialization Career Skills']
punctuation = ".,:;/?!"
qualities = ["accurate", "auto-fire", "blast", "breach", "burn", "concussive", "cortosis", "cumbersome", "defensive", "deflection", "disorient", "ensnare", "guided", "knockdown", "inaccurate", "inferior". "ion", "limited ammo", "linked", "pierce", "prepare", "slow-firing", "stun", "stun damage", "sunder", "superior", "tractor", "vicious"]

def isSymbols(word):
    word = word
    if word[-1] in punctuation:
        word = word[:-1]
    if word[0] == "(" and word[-1] == ")":
        word = word[1:-1]
    if len(word) > 0 and word[0] not in symbols:
        return False
    for i in range(1, len(word)):
        if word[i] != word[i-1]:
            return False
    return True

def convertToTags(word):
    s = ""
    for c in word:
        if c in symbols:
            s+= symbolParser[c]
        else:
            s+= c
    return s

def parseCell(cellData):
    if isinstance(cellData, int):
        return cellData
    newData = []
    prevWord = ""
    for word in cellData.split():
        if isSymbols(word):
            newData.append(convertToTags(word))
        elif prevWord == "stun" and word.lower() == "damage":
            newData.append("<stun-damage>")
        elif prevWord == "stun":
            newData.append("<stun>")
        elif prevWord == "limited" and word.lower() = "ammo":
            newData.append("<limited-ammo>")
        elif word.lower() in qualities:
            newData.append("<" + word.lower() + ">")
        else:
            newData.append(word)
        prevWord = word.lower()
    return " ".join(newData)


talentSheet = book.sheet_by_name("Talents")

weapon_columns = ["name", "skill", "damage", "crit", "range", "encumbrance", "hardpoints", "price", "restricted", "rarity", "special", "specialDescription", "abilityNotes", "bookSet", "source"]
def ReadWeaponSection(sheet, weapons, wtype, rstart, rstop):
    for r in range(rstart,rstop):
        weapon = {}
        weapon["type"]: wtype
        for c in range(0, len(weapon_columns)):
            val = sheet.cell_value(r,c)
            if isinstance(val, str):
                weapon[weapon_columns[c]] = parseCell(sheet.cell_value(r,c))
                if weapon_columns[c] == "special":
                    # print(":::::::::::::::::::::\nspecial properties:\n", sheet.cell_value(r,c), "\n::::::::::::::::::::::::::::::::::\n")
                    weapon[weapon_columns[c]] = parseCell(sheet.cell_value(r,c)).replace("\n", "").split(",")
                    # print(":::::::::::::::::::::\nnew special properties:\n", weapon[weapon_columns[c]], "\n:::::::::::::::::::::::::::::::\n")
                if weapon_columns[c] == "restricted":
                    if sheet.cell_value(r,c).strip() == "(R)":
                        weapon["restricted"] = True
                    else:
                        weapon["restricted"] = False
            else:
                weapon[weapon_columns[c]] = sheet.cell_value(r,c)
        weapons.append(weapon)


def ReadWeaponsFromSheet():
    sheet = book.sheet_by_name("Weapons")
    weapons = []
    ReadWeaponSection(sheet, weapons, "energy", 5, 137)
    ReadWeaponSection(sheet, weapons, "slugthrowers", 143, 169)
    ReadWeaponSection(sheet, weapons, "special", 172, 211)
    ReadWeaponSection(sheet, weapons, "explosives", 214, 277)
    ReadWeaponSection(sheet, weapons, "brawl", 292, 310)
    ReadWeaponSection(sheet, weapons, "melee", 315, 407)
    ReadWeaponSection(sheet, weapons, "lightsaber", 411, 432)
    return weapons

demolition_columns = ["name", "baseDamage", "additionalDamage", "encumbrance", "price", "rarity", "blastRadius", "abilityNotes", "bookSet", "source"]
def ReadDemolitionsFromSheet():
    sheet = book.sheet_by_name("Weapons")
    demolitions = []
    for r in range(280, 288):
        demolition = {}
        for c in range(0, len(demolition_columns)):
            val = sheet.cell_value(r,c)
            if demolition_columns[c] == "price":
                if isinstance(val, str) and len(val.split()) > 1:
                    val = val.split()
                    demolition["restricted"] = True
                    demolition["price"] = val[1]
                else:
                    demolition["restricted"] = False
                    demolition[demolition_columns[c]] = val
            else:
                demolition[demolition_columns[c]] = parseCell(val)
        demolitions.append(demolition)
    return demolitions

 
    
database = {
    # "weapons": ReadWeaponsFromSheet(),
    "ordnances": ReadDemolitionsFromSheet()
}

# with open("weapons_list.json", "w") as f:
#     f.write(json.dumps(database, sort_keys=True))

for i in database["ordnances"]:
    print("::::::::::::::::::::::::::::::\n", i["abilityNotes"], "\n::::::::::::::::::::::::::\n")

# print(isSymbols("(ddd)."))    
# print(convertToTags("(ddd)."))    
        