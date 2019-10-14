-- --------------------------------
-- -- Initialising the database ---
-- --------------------------------

-- * * * Drop the table if it already exists * * *

-- Table: Character_In_Movie
IF OBJECT_ID('dbo.Character_In_Movie', 'U') IS NOT NULL
ALTER TABLE dbo.Character_In_Movie DROP CONSTRAINT FK_Character_Movie_CharacterID

IF OBJECT_ID('dbo.Character_In_Movie', 'U') IS NOT NULL
ALTER TABLE dbo.Character_In_Movie DROP CONSTRAINT FK_Character_Movie_MovieID

IF OBJECT_ID('dbo.Character_In_Movie', 'U') IS NOT NULL
DROP TABLE dbo.Character_In_Movie
GO

-- Table: Student_In_House
IF OBJECT_ID('dbo.Student_In_House', 'U') IS NOT NULL
ALTER TABLE dbo.Student_In_House DROP CONSTRAINT FK_Character_House_CharacterID

IF OBJECT_ID('dbo.Student_In_House', 'U') IS NOT NULL
ALTER TABLE dbo.Student_In_House DROP CONSTRAINT FK_Character_House_HouseID

IF OBJECT_ID('dbo.Student_In_House', 'U') IS NOT NULL
DROP TABLE dbo.Student_In_House
GO

-- Table: Character_Staff
IF OBJECT_ID('dbo.Character_Staff', 'U') IS NOT NULL
ALTER TABLE dbo.Character_Staff DROP CONSTRAINT FK_Character_Staff_CharacterID

-- Table: MagicalCreature_In_Movie
IF OBJECT_ID('dbo.MagicalCreature_In_Movie', 'U') IS NOT NULL
ALTER TABLE dbo.MagicalCreature_In_Movie DROP CONSTRAINT FK_MagicalCreature_Movie_MagicalCreatureID

IF OBJECT_ID('dbo.MagicalCreature_In_Movie', 'U') IS NOT NULL
ALTER TABLE dbo.MagicalCreature_In_Movie DROP CONSTRAINT FK_MagicalCreature_Movie_MovieID

IF OBJECT_ID('dbo.MagicalCreature_In_Movie', 'U') IS NOT NULL
DROP TABLE dbo.MagicalCreature_In_Movie
GO

-- Table: Spell_In_Movie
IF OBJECT_ID('dbo.Spell_In_Movie', 'U') IS NOT NULL
ALTER TABLE dbo.Spell_In_Movie DROP CONSTRAINT FK_Spell_Movie_SpellID

IF OBJECT_ID('dbo.Spell_In_Movie', 'U') IS NOT NULL
ALTER TABLE dbo.Spell_In_Movie DROP CONSTRAINT FK_Spell_Movie_MovieID

IF OBJECT_ID('dbo.Spell_In_Movie', 'U') IS NOT NULL
DROP TABLE dbo.Spell_In_Movie
GO

-- Table: MagicalObject_In_Movie
IF OBJECT_ID('dbo.MagicalObject_In_Movie', 'U') IS NOT NULL
ALTER TABLE dbo.MagicalObject_In_Movie DROP CONSTRAINT FK_MagicalObject_Movie_MagicalObjectID

IF OBJECT_ID('dbo.MagicalObject_In_Movie', 'U') IS NOT NULL
ALTER TABLE dbo.MagicalObject_In_Movie DROP CONSTRAINT FK_MagicalObject_Movie_MovieID

IF OBJECT_ID('dbo.MagicalObject_In_Movie', 'U') IS NOT NULL
DROP TABLE dbo.MagicalObject_In_Movie
GO

-- Table: Character
IF OBJECT_ID('dbo.Character', 'U') IS NOT NULL
DROP TABLE dbo.Character
GO

IF OBJECT_ID('dbo.Character_Staff', 'U') IS NOT NULL
DROP TABLE dbo.Character_Staff
GO

-- Table: House
IF OBJECT_ID('dbo.House', 'U') IS NOT NULL
DROP TABLE dbo.House
GO

-- Table: Movie
IF OBJECT_ID('dbo.Movie', 'U') IS NOT NULL
DROP TABLE dbo.Movie
GO

-- Table: MagicalObject
IF OBJECT_ID('dbo.MagicalObject', 'U') IS NOT NULL
DROP TABLE dbo.MagicalObject
GO

-- Table: MagicalCreature
IF OBJECT_ID('dbo.MagicalCreature', 'U') IS NOT NULL
DROP TABLE dbo.MagicalCreature
GO

-- Table: Spell
IF OBJECT_ID('dbo.Spell', 'U') IS NOT NULL
DROP TABLE dbo.Spell
GO

-- Table: User
IF OBJECT_ID('dbo.hpUser', 'U') IS NOT NULL
DROP TABLE dbo.hpUser
GO 


-- --------------------------------
-- -- Creating the tables ---------
-- --------------------------------

CREATE TABLE dbo.House
(
    HouseID INT IDENTITY(1,1) NOT NULL,
    HouseName NVARCHAR(50) NOT NULL,
    HouseFounder NVARCHAR(255) NOT NULL,
    HouseAnimal NVARCHAR(50) NOT NULL,
    HouseColours NVARCHAR(255) NOT NULL,
    HousePersonalTraits NVARCHAR(255) NOT NULL,
    HouseHead NVARCHAR(255) NOT NULL,
    HouseGhost NVARCHAR(255) NOT NULL,
    HouseCommonRoom NVARCHAR(255) NOT NULL,

    PRIMARY KEY (HouseID)
);

CREATE TABLE dbo.Character
(
    CharacterID INT IDENTITY(1,1) NOT NULL,
    CharacterFirstName NVARCHAR(50) NOT NULL,
    CharacterLastName NVARCHAR(50) NOT NULL,
    CharacterAlsoKnownAs NVARCHAR(255),
    CharacterGender NVARCHAR(50) NOT NULL,
    CharacterBloodStatus NVARCHAR(50),
    CharacterDateOfBirth NVARCHAR(50),
    CharacterDateOfDeath NVARCHAR(50),
    CharacterPet NVARCHAR(50),
    CharacterWand NVARCHAR(255),
    CharacterPatronus NVARCHAR(50),
    CharacterBoggart NVARCHAR(255),
    CharacterQuote NVARCHAR(MAX),

    PRIMARY KEY (CharacterID)
);

CREATE TABLE dbo.Movie
(
    MovieID INT IDENTITY(1,1) NOT NULL,
    MovieName NVARCHAR(255) NOT NULL,
    MovieReleaseDate NVARCHAR(50) NOT NULL,

    PRIMARY KEY (MovieID)
);

CREATE TABLE dbo.Character_In_Movie
(
    FK_CharacterID INT NOT NULL,
    FK_MovieID INT NOT NULL,

    CONSTRAINT FK_Character_Movie_CharacterID FOREIGN KEY (FK_CharacterID) REFERENCES dbo.Character (CharacterID),
    CONSTRAINT FK_Character_Movie_MovieID FOREIGN KEY (FK_MovieID) REFERENCES dbo.Movie (MovieID)
);

CREATE TABLE dbo.Student_In_House
(
    FK_CharacterID INT NOT NULL,
    FK_HouseID INT NOT NULL,

    CONSTRAINT FK_Character_House_CharacterID FOREIGN KEY (FK_CharacterID) REFERENCES dbo.Character (CharacterID),
    CONSTRAINT FK_Character_House_HouseID FOREIGN KEY (FK_HouseID) REFERENCES dbo.House (HouseID)
);

CREATE TABLE dbo.Character_Staff
(
    FK_CharacterID INT NOT NULL,
    CharacterTitle NVARCHAR(255) NOT NULL,

    CONSTRAINT FK_Character_Staff_CharacterID FOREIGN KEY (FK_CharacterID) REFERENCES dbo.Character (CharacterID)
);

CREATE TABLE dbo.MagicalObject
(
    MagicalObjectID INT IDENTITY(1,1) NOT NULL,
    MagicalObjectName NVARCHAR(255) NOT NULL,
    MagicalObjectType NVARCHAR(50) NOT NULL,
    MagicalObjectPurpose NVARCHAR(255) NOT NULL,
    MagicalObjectDescription NVARCHAR(MAX),
    MagicalObjectDateOfDestruction NVARCHAR(50),

    PRIMARY KEY (MagicalObjectID)
);

CREATE TABLE dbo.MagicalCreature
(
    MagicalCreatureID INT IDENTITY (1,1) NOT NULL,
    MagicalCreatureName NVARCHAR(50) NOT NULL,
    MagicalCreatureAppearance NVARCHAR(255) NOT NULL,
    MagicalCreatureAbilities NVARCHAR(255) NOT NULL,
    MagicalCreatureTypicalHabitat NVARCHAR(255) NOT NULL,

    PRIMARY KEY (MagicalCreatureID)
)

CREATE TABLE dbo.Spell
(
    SpellID INT IDENTITY(1,1) NOT NULL,
    SpellName NVARCHAR(50) NOT NULL,
    SpellPurpose NVARCHAR(255) NOT NULL,

    PRIMARY KEY (SpellID)
);

CREATE TABLE dbo.MagicalObject_In_Movie
(
    FK_MagicalObjectID INT NOT NULL,
    FK_MovieID INT NOT NULL,

    CONSTRAINT FK_MagicalObject_Movie_MagicalObjectID FOREIGN KEY (FK_MagicalObjectID) REFERENCES dbo.MagicalObject (MagicalObjectID),
    CONSTRAINT FK_MagicalObject_Movie_MovieID FOREIGN KEY (FK_MovieID) REFERENCES dbo.Movie (MovieID)
);

CREATE TABLE dbo.MagicalCreature_In_Movie
(
    FK_MagicalCreatureID INT NOT NULL,
    FK_MovieID INT NOT NULL,

    CONSTRAINT FK_MagicalCreature_Movie_MagicalCreatureID FOREIGN KEY (FK_MagicalCreatureID) REFERENCES dbo.MagicalCreature (MagicalCreatureID),
    CONSTRAINT FK_MagicalCreature_Movie_MovieID FOREIGN KEY (FK_MovieID) REFERENCES dbo.Movie (MovieID)
);

CREATE TABLE dbo.Spell_In_Movie
(
    FK_SpellID INT NOT NULL,
    FK_MovieID INT NOT NULL,

    CONSTRAINT FK_Spell_Movie_SpellID FOREIGN KEY (FK_SpellID) REFERENCES dbo.Spell (SpellID),
    CONSTRAINT FK_Spell_Movie_MovieID FOREIGN KEY (FK_MovieID) REFERENCES dbo.Movie (MovieID)
);


CREATE TABLE dbo.hpUser
(
    hpUserID INT IDENTITY(1,1) NOT NULL,
    
    hpUserEmail NVARCHAR(255) NOT NULL,
    hpPwHash NVARCHAR(255) NOT NULL,

    PRIMARY KEY (hpUserID)
);


-- --------------------------------
-- Populating the DB with data
-- --------------------------------

INSERT INTO dbo.Movie
    (MovieName, MovieReleaseDate)
VALUES
    ('Harry Potter and the Philosopher’s Stone', '2001/11/23'),
    ('Harry Potter and the Chamber of Secrets', '2002/11/22'),
    ('Harry Potter and the Prisoner of Azkaban', '2004/06/11'),
    ('Harry Potter and the Goblet of Fire', '2005/11/18'),
    ('Harry Potter and the Order of the Phoenix', '2007/07/13'),
    ('Harry Potter and the Half-Blood Prince', '2009/06/06'),
    ('Harry Potter and the Deathly Hallows: Part 1', '2010/11/18'),
    ('Harry Potter and the Deathly Hallows: Part 2', '2011/07/13');
GO


INSERT INTO dbo.House
    (HouseName, HouseFounder, HouseAnimal, HouseColours, HousePersonalTraits, HouseHead, HouseGhost, HouseCommonRoom)
VALUES
    ('Gryffindor', 'Godric Gryffindor', 'Lion', 'Scarlet and gold', 'Bravery, daring, nerve and chivalry', 'Minerva McGonagall', 'Nearly Headless Nick', 'Gryffindor Tower'),
    ('Hufflepuff', 'Helga Hufflepuff', 'Badger', 'Yellow and black', 'Hard work, dedication, patience, loyalty and fair play', 'Pomona Sprout', 'Fat Friar', 'Hufflepuff Basement'),
    ('Ravenclaw', 'Rowena Ravenclaw', 'Eagle', 'Blue and bronze', 'Intelligence, knowledge and wit', 'Filius Flitwick', 'Grey Lady', 'Ravenclaw Tower'),
    ('Slytherin', 'Salazar Slytherin', 'Basilisk', 'Green and silver', 'Ambition, cunning and resourcefulness', 'Severus Snape', 'Bloody Baron', 'Slytherin Dungeon');
GO


INSERT INTO dbo.Character
    (CharacterFirstName, CharacterLastName, CharacterAlsoKnownAs, CharacterGender, CharacterBloodStatus, CharacterDateOfBirth, CharacterDateOfDeath, CharacterPet, CharacterWand, CharacterPatronus, CharacterBoggart, CharacterQuote)
VALUES
    -- Gryffindor
    ('Harry', 'Potter', 'Boy Who Lived', 'Male', 'Half-blood', '1980/07/31', NULL, 'Owl', '11", Holly, phoenix feather', 'Stag', 'Dementor', '"You are protected, in short, by your ability to love! The only protection that can possibly work against the lure of power like Voldemort’s! In spite of all the temptation you have endured, all the suffering, you remain pure of heart, just as pure as you were at the age of eleven, when you stared into a mirror that reflected your heart’s desire, and it showed you only the way to thwart Lord Voldemort, and not immortality or riches. Harry, have you any idea how few wizards could have seen what you saw in that mirror?" —Description of Harry’s rare nature'),

    ('Ronald', 'Weasley', 'Ron', 'Male', 'Pure-blood', '1980/02/01', NULL, 'Rat', '12", ash, unicorn tail hair', 'Jack russel terrier', 'Spiders', '"I’m the sixth in our family to go to Hogwarts. You could say I got a lot to live up to. Bill and Charlie have already left — Bill was Head Boy and Charlie was captain of Quidditch. Now Percy’s a prefect. Fred and George mess around a lot, but they still get really good marks and everyone thinks they’re really funny. Everyone expects me to do as well as the others, but if I do, it’s no big deal, because they did it first." —Ron’s family and other’s expectations'),

    ('Hermoine', 'Granger', 'Mione (by Ron)', 'Female', 'Muggle-born', '1979/9/19', NULL, 'Cat', '10¾", vine wood, dragon heartstring', 'Otter', 'Failure', 'Harry Potter: "But why’s she got to go to the library?" Ronald Weasley: "Because that’s what Hermione does. When in doubt, go to the library. —Hermione’s book dependency"'),

    ('Neville', 'Longbottom', NULL, 'Male', 'Pure-blood', '1980/07/30', NULL, 'Toad', '13", Cherry, unicorn hair', 'Non-corporeal', 'Severus Snape', '"I’ll join you when hell freezes over! Dumbledore’s Army! —Neville bravely rejects Voldemort’s offer to join him"'),

    ('Seamus', 'Finnigan', 'O’Flaherty (by Cuthbert Binns)', 'Male', 'Half-Blood', '1979/09/01', NULL, NULL, NULL, 'Fox', 'Banshee', 'Professor McGonagall: "Why don’t you confer with Mr Finnigan? As I recall, he has a particular proclivity for pyrotechnics." Seamus: "I can bring it down!" —Plans regarding Seamus blowing up the Wooden Bridge'),
    -- Hufflepuff
    ('Cedric', 'Diggory', 'Pretty boy Diggory', 'Male', 'Pure-blood', '1977/09/01', '1995/06/24', NULL, '12¼", Ash and unicorn hair', NULL, 'Lord Voldemort', '"We’ll celebrate a boy who was, kind and honest, and brave, and true right to the very end. —Dumbledore regarding Cedric’s character"'),
    -- Slytherin
    ('Millicent', 'Bulstrode', NULL, 'Female', 'Half-blood', '1980/06/11', NULL, 'Cat', '12¾", oak, runespoor fang', 'Bull', 'Being exposed as a half-blood' , '"Point me!", "Hermione and Millicent Bulstrode were still moving; Millicent had Hermione in a headlock and Hermione was whimpering in pain; both their wands lay forgotten on the floor. Harry leapt forward and pulled Millicent off. It was difficult: She was a lot bigger than he was." —Millicent engaged in a practise duel with Hermione Granger'),

    ('Vincent', 'Crabbe', NULL, 'Male', 'Pure-blood', '1980/07/21', '1998/04/02', NULL, NULL, NULL, 'Lord Voldemort', '"It’s that Mudblood! AVADA KEDAVRA!" —Crabbe attempts to murder Hermione Granger with the Killing Curse in his final duel'),

    ('Draco', 'Malfoy', 'Malfoy', 'Male', 'Pure-blood', '1980/06/05', NULL, 'Owl', '11" ebony with a phoenix feather core', 'Cobra', 'Inferi', '"I really don’t think they should let the other sort in, do you? They’re just not the same, they’ve never been brought up to know our ways. Some of them have never even heard of Hogwarts until they get the letter, I imagine. I think they should keep it in the old wizarding families." —Draco shows his prejudice at a young age'),

    ('Pansy', 'Parkinson', NULL, 'Female', 'Pure-blood', '1980/02/13', NULL, 'Owl', 'Rowan wood with a dragon heartstring', 'Dragon', 'Being stripped of her powers and forced to live as a muggle', '"But, he’s there! Potter’s there! Someone grab him!" —Pansy’s cowardice and stupidity before the Battle of Hogwarts'),

    ('Blaise', 'Zabini', NULL, 'Male', 'Half-blood', '1980/12/23', NULL, 'Owl', '13", ivy, runespoor fang', 'Mink', 'His mother as an actual over-sized Black Widow Spider', '"Yeah, Zabini, because you’re so talented... at posing...." —Ginny Weasley’s opinion of Blaise'),

    ('Tom', 'Riddle', 'You-Know-Who', 'Male', 'Half-blood', '1926/12/31', '1998/04/02', 'Basilisk', '13.5", yew, phoenix feather', 'Unable to have a Patronus', 'His own corpse', '"You think I was going to use my filthy Muggle father’s name forever? I, in whose veins runs the blood of Salazar Slytherin himself, through my mother’s side? I, keep the name of a foul, common Muggle, who abandoned me even before I was born, just because he found out his wife was a witch? No, Harry. I fashioned myself a new name, a name I knew wizards everywhere would one day fear to speak, when I had become the greatest sorcerer in the world!" —Tom Riddle’s transformation into Lord Voldemort'),
    --Ravenclaw
    ('Cho', 'Chang', NULL, 'Female', 'Pure-blood', '1978/09/01', NULL, 'Owl', 'Dogwood, Veela hair core', 'Swan', 'Lord Voldemort', '"Obviously, she is feeling very sad, because of Cedric dying. Then I expect she’s feeling confused because she liked Cedric and now she likes Harry, and she can’t work out who she likes best. Then she’ll be feeling guilty, thinking it’s an insult to Cedric’s memory to be kissing Harry at all... And she probably can’t work out what her feelings are towards Harry anyway, because he was the one who was with Cedric when Cedric died, so that’s all very mixed up and painful." —Cho’s grief, confusion, and guilt'),

    ('Luna', 'Lovegood', 'Loony Lovegood', 'Female', 'Pure-blood', '1981/02/13', NULL, NULL, 'Apple wood, unknown core', 'Hare', 'Lord Volvemort', '"The girl gave off an aura of distinct dottiness. Perhaps it was the fact that she had stuck her wand behind her left ear for safekeeping, or that she had chosen to wear a necklace of Butterbeer caps, or that she was reading a magazine upside down." —Luna’s unusual disposition'),

    ('Padma', 'Patil', NULL, 'Female', 'Half-blood', '1980/04/21', NULL, 'Tabby cat', NULL, 'Non-corporeal', 'Giant snake', '"Parvati Patil’s twin’s in Ravenclaw, and they’re identical. You’d think they’d be together, wouldn’t you?" —Comment regarding the Patil twins'),

    ('Terry', 'Boot', NULL, 'Male', 'Half-blood', '1979/08/15', NULL, 'Toad', '½" Chestnut and Larch wood, unknown core', 'Lynx', 'Lord Voldemort', 'Terry Boot: "You can do a Protean Charm?" Hermione Granger: "Yes." Terry Boot: "But that’s... that’s N.E.W.T. standard, that is." —Terry impressed with Hermione’s ability to perform N.E.W.T. level magic'),
    --Staff
    ('Albus', 'Dumbledore', 'Dubly-dorr', 'Male', 'Half-blood', '1881/06/24', '1997/05/30', 'Phoenix', 'Elder wood, Thestral tail hair core', 'Phoenix', 'The corpse of his sister, Ariana', '"Albus Dumbledore was never proud or vain; he could find something to value in anyone, however apparently insignificant or wretched, and I believe that his early losses endowed him with great humanity and sympathy. I shall miss his friendship more than I can say, but my loss is as nothing compared to the Wizarding world’s. That he was the most inspiring and the best loved of all Hogwarts headmasters cannot be in question. He died as he lived: working always for the greater good and, to his last hour, as willing to stretch out a hand to a small boy with dragon pox as he was on the day that I met him." —Albus Dumbledore’s obituary'),

    ('Filius', 'Flitwick', 'Squeaky voice', 'Male', 'Part-goblin, half-blood', '1950/10/17', NULL, 'Screech owl', 'Holly wood, kelpy hair core', 'Non-corporeal', 'Lord Voldemort', '"Speaking of eccentrics, you’ll like our Head of house, Professor Filius Flitwick. People often underestimate him, because he’s really tiny (we think he’s part elf, but we’ve never been rude enough to ask) and he’s got a squeaky voice, but he’s the best and most knowledgeable Charms master alive in the world today. His office door is always open to any Ravenclaw with a problem, and if you’re in a real state he’ll get out these delicious little cupcakes he keeps in a tin in his desk drawer and make them do a little dance for you. In fact, it’s worth pretending you’re in a real state just to see them jive." —Description of Professor Flitwick'),

    ('Rubeus', 'Hagrid', 'The half-giant', 'Male', 'Half-giant, half-blood', '1928/12/06', NULL, 'Fluffy, a three-headed dog', '16” oak wood, unknown core', 'None', 'Lord Voldemort', '"I would trust Hagrid with my life." —Albus Dumbledore’s trust in Hagrid'),

    ('Gilderoy', 'Lockhart', NULL, 'Male', 'Half-blood', '1964/01/26', NULL, 'Cat', '9”, cherry wood, dragon heartstring core', 'Non-corporeal', 'Lord Voldemort', '"It’s not all book signings and publicity photos, you know. You want fame, you have to be prepared for a long hard slog." —Lockhart speaking about his life during a detention session'),

    ('Remus', 'Lupin', 'Moony', 'Male', 'Werewolf, half-blood', '1960/03/10', NULL, NULL, '10¼” cypress wood, unicorn hair core', 'Wolf', 'Full moon', '"My kind don’t usually breed! It will be like me, I am convinced of it — how can I forgive myself, when I knowingly risked passing on my own condition to an innocent child? And if, by some miracle, it is not like me, then it will be better off, a hundred times so, without a father of whom it must always be ashamed!" —Lupin’s intense hatred of his condition as a Werewolf'),

    ('Minerva', 'McGonagal', 'Headmistress of all kittens', 'Female', 'Half-blood', '1940/10/04', NULL, NULL, '9½” fir wood, dragon heartstring core', 'Cat', 'Lord Voldemort', '"Hogwarts is threatened! Man the boundaries, protect us, do your duty to our school!" —McGonagall prepares for the Battle of Hogwarts'),

    ('Argus', 'Flich', NULL, 'Male', 'Squib', '1929/10/24', NULL, 'Mrs. Norris, a red-eyed cat', 'None', 'None', NULL, '"I bet you’ll think twice about breaking a school rule again, won’t you, eh? Oh, yes… hard work and pain are the best teachers, if you ask me… It’s just a pity they let the old punishments die out… hang you by your wrists from the ceiling for a few days, I’ve got the chains still in my office, keep ’em well oiled in case they’re ever needed… Right, off we go, and don’t think of running off, now. It’ll be worse for you if you do." —Filch’s sadistic enjoyment when punishing students'),

    ('Rolanda', 'Hooch', 'Madam Hooch', 'Female', 'Part-human, half-blood', '1901/10/29', NULL, NULL, 'Pine wood, unknown core', 'Non-corporeal', 'Lord Voldemort', '"None of you is to move while I take this boy to the hospital wing! You leave those brooms where they are or you’ll be out of Hogwarts before you can say ’Quidditch.’" —Hooch’s strict attitude with her students'),

    ('Alastor', 'Moody', 'Mad-eye', 'Male', 'Pure-blood', '1948/11/03', '1997/07/27', NULL, 'Rowan wood, veela hair core', 'Non-corporeal', 'Lord Voldemort', '"Are you quite sure it’s him, Lupin? It’d be a nice lookout if we bring back some Death Eater impersonating him. We ought to ask him something only the real Potter would know. Unless anyone brought any Veritaserum?" —Moody’s paranoia and overly suspicious nature'),

    ('Poppy', 'Pomfrey', NULL, 'Female', 'Pure-blood', '1950/05/30', NULL, NULL, NULL, 'Non-corporeal', 'Lord Voldemort', '"Madam Pomfrey, the matron, was a nice woman, but very strict." —Pomfrey’s stern and kind disposition'),

    ('Severus', 'Snape', 'Half-blood Prince', 'Male', 'Half-blood', '1960/01/09', '1998/05/02', NULL, 'Ebony wood, unknown core', 'Doe', 'Corpse of Lily J. Potter', '"I have spied for you and lied for you, put myself in mortal danger for you. Everything was supposed to be to keep Lily Potter’s son safe. Now you tell me you have been raising him like a pig for slaughter." —Snape regarding the planned fate of Harry Potter'),

    ('Dolores', 'Umbridge', NULL, 'Female', 'Half-blood', '1955/07/26', NULL, 'Cat', '8” birch wood, dragon heartstring core', 'Persian cat', 'Lord Voldemort', '"When they entered the Defence Against the Dark Arts classroom they found Professor Umbridge already seated at the teacher’s desk, wearing the fluffy pink cardigan of the night before and the black velvet bow on top of her head. Harry was again reminded forcibly of a large fly perched unwisely on top of an even larger toad." —A negative impression of Dolores');
GO


INSERT INTO dbo.Character_Staff
    (FK_CharacterID, CharacterTitle)
VALUES
    (17, 'Professor of Defence against the Dark Arts, Headmaster of Hogwarts'),
    (18, 'Charms Master'),
    (19, 'Keeper of Keys and hrounds. Professor of Magical Creatures'),
    (20, 'Professor of Defence against the Dark Arts'),
    (21, 'Professor of Defence against the Dark Arts'),
    (22, 'Professor of Transfiguration and Employee of the Magical Law Enforcement'),
    (23, 'Caretaker of Hogwarts'),
    (24, 'Flying Instructor and Quidditch Referee at Hogwarts'),
    (25, 'Auror'),
    (26, 'Nurse at Hogwarts'),
    (27, 'Potions Master at Hogwarts'),
    (28, 'Professor of Defence against the Dark Arts')
GO


INSERT INTO dbo.Character_In_Movie
    (FK_CharacterID, FK_MovieID)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (2, 1),
    (2, 2),
    (2, 3),
    (2, 4),
    (2, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (3, 1),
    (3, 2),
    (3, 3),
    (3, 4),
    (3, 5),
    (3, 6),
    (3, 7),
    (3, 8),
    (4, 1),
    (4, 2),
    (4, 3),
    (4, 4),
    (4, 5),
    (4, 6),
    (4, 7),
    (4, 8),
    (5, 1),
    (5, 2),
    (5, 3),
    (5, 4),
    (5, 5),
    (5, 6),
    (5, 7),
    (5, 8),
    (6, 3),
    (6, 4),
    (7, 1),
    (7, 2),
    (7, 6),
    (8, 1),
    (8, 2),
    (8, 3),
    (8, 4),
    (8, 5),
    (8, 6),
    (9, 1),
    (9, 2),
    (9, 3),
    (9, 4),
    (9, 5),
    (9, 6),
    (9, 7),
    (9, 8),
    (10, 1),
    (10, 2),
    (10, 3),
    (10, 5),
    (10, 6),
    (10, 7),
    (10, 8),
    (11, 6),
    (11, 7),
    (11, 8),
    (12, 2),
    (13, 4),
    (13, 5),
    (13, 6),
    (13, 7),
    (13, 8),
    (14, 5),
    (14, 6),
    (14, 7),
    (14, 8),
    (15, 3),
    (15, 4),
    (15, 5),
    (15, 6),
    (15, 7),
    (15, 8),
    (16, 1),
    (16, 5),
    (17, 1),
    (17, 2),
    (17, 3),
    (17, 4),
    (17, 5),
    (17, 6),
    (17, 7),
    (17, 8),
    (18, 1),
    (18, 2),
    (18, 3),
    (18, 4),
    (18, 5),
    (18, 6),
    (18, 8),
    (19, 1),
    (19, 2),
    (19, 3),
    (19, 4),
    (19, 5),
    (19, 6),
    (19, 7),
    (19, 8),
    (20, 2),
    (21, 3),
    (21, 5),
    (21, 6),
    (21, 7),
    (21, 8),
    (22, 1),
    (22, 2),
    (22, 3),
    (22, 4),
    (22, 5),
    (22, 6),
    (22, 7),
    (22, 8),
    (23, 1),
    (23, 2),
    (23, 3),
    (23, 4),
    (23, 5),
    (23, 6),
    (23, 7),
    (23, 8),
    (24, 1),
    (25, 4),
    (25, 5),
    (25, 7),
    (26, 2),
    (26, 6),
    (26, 8),
    (27, 1),
    (27, 2),
    (27, 3),
    (27, 4),
    (27, 5),
    (27, 6),
    (27, 7),
    (27, 8),
    (28, 5),
    (28, 6),
    (28, 7)
GO


INSERT INTO dbo.Student_In_House
    (FK_CharacterID, FK_HouseID)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 2),
    (7, 3),
    (8, 3),
    (9, 3),
    (10, 3),
    (11, 3),
    (12, 3),
    (13, 4),
    (14, 4),
    (15, 4),
    (16, 4)
GO


INSERT INTO dbo.MagicalObject
    (MagicalObjectName, MagicalObjectType, MagicalObjectPurpose, MagicalObjectDescription, MagicalObjectDateOfDestruction)
VALUES
    ('Resurrection Stone', 'Deathly Hallows', 'It is used to bring people back from the dead', 'The Resurrection Stone is one of the fabled Deathly Hallows. In ’The Tale of the Three Brothers’, it was the second Hallow created, supposedly by Death himself. It was bestowed upon Cadmus Peverell after he requested, as his bounty, something with the power to recall loved ones from Death.', NULL),

    ('Elder Wand', 'Deathly Hallows', 'It is used to cast spells that otherwise would be impossible', 'It is said to be the most powerful wand that has ever existed, able to perform feats of magic that would normally be impossible even for the most skilled wizards, such as mending another wand damaged beyond normal magical repair. The Elder Wand’s core is the tail hair of a Thestral, a potent yet tricky substance to master; only a witch or wizard who is capable of accepting death can do so, since only by them can a Thestral hair even be seen.', '1998/04/02'),

    ('Invisibility Cloak', 'Deathly Hallows', 'The Cloak of Invisibility has the power to shield the wearer from being seen by Death', 'Unlike other invisibility cloaks known to exist, this is uniquely a true invisibility cloak, in that it is able to completely shield the wearer and others from sight and cannot be worn out by time or spells; other cloaks will lose their ability to conceal the wearer over time or become worn out, but the Hallow cloak will never fade or become damaged.', NULL),

    ('Deluminator', 'Concealers', 'It is used to remove or absorb (as well as return) the light from any light source to provide cover to the user', 'The Deluminator, also known as the Put-Outer, is a magical device used by Albus Dumbledore (the first known owner and designer of the one Deluminator known to exist) to remove light sources from the Deluminator’s immediate surroundings, as well as bestow them. It looks like a standard silver cigarette lighter.', NULL),

    ('Rememberall', 'Detectors', 'It tells the holder that they forgot something', 'A Remembrall is a small, clear orb, about the size of a large marble, containing smoke that turns red when it detects that the person holding it has forgotten something. It does not tell the holder what has been forgotten. ', NULL),

    ('Marauder’s Map', 'Detectors', 'It reveals Hogwarts School of Witchcraft and Wizardry, even the hidden passages', 'The Marauder’s Map was a magical document that revealed all of Hogwarts School of Witchcraft and Wizardry. Not only did it show every classroom, every hallway, and every corner of the castle, but it also showed every inch of the grounds, as well as all the secret passages that were hidden within its walls and the location of every person in the grounds, portrayed by a dot. It was also capable of accurately identifying each person, and was not fooled by animagi, Polyjuice Potions, or invisibility cloaks; even the Hogwarts ghosts were not exempt.', NULL),

    ('Howler', 'Communication', 'It is a blood-red letter sent to signify extreme anger or to convey a message very loudly and publicly', 'When it is opened, the sender’s voice, which has been magically magnified to a deafening volume, bellows a message at the recipient and then self-destructs itself by burning. If it is not opened or there is a delay in opening it, the letter smolders, explodes violently, and shouts the message out even louder than normal.', NULL),

    ('The Mirror of Erised', 'Mirrors', 'It shows the ’deepest, most desperate desire of our hearts’', 'The Mirror of Erised is a mystical mirror discovered by Harry in an abandoned classroom in Philosopher’s Stone. On it is inscribed ’erised stra ehru oyt ube cafru oyt on wohsi’. When mirrored and correctly spaced, this reads ’I show not your face but your heart’s desire.’ As ’erised’ reversed is ’desire,’ it is the ’Mirror of Desire.’ ', NULL),

    ('Goblet of Fire', 'Legendary Magical Artifacts', 'It is used solely to choose the participating school champions, serving as an ’impartial judge’', 'The Goblet of Fire is a goblet made of wood and is used at the beginning of every Triwizard Tournament.Slips of parchment with the names of potential candidates are placed in the Goblet and, at the designated time, a representative from each school is chosen when the slip of parchment containing their name spouts forth from the Goblet in a fountain of magical fire. The fake Moody stated once that the Goblet of Fire was ’an exceptionally powerful magical object’ and it is very difficult to hoodwink, unless someone uses an exceptionally strong Confundus Charm.', NULL),

    ('Sorting Hat', 'Legendary Magical Artifacts', 'It is used to determine which of the four school houses – Gryffindor, Hufflepuff, Ravenclaw or Slytherin – each new student is to be assigned for their years at Hogwarts.', 'The hat resembles a dilapidated conical leather wide-brimmed wizard’s hat, with folds and tears that make it appear to have eyes and a mouth. During the opening banquet at the beginning of each school year, the Hat is placed on every first-year student’s head. The Hat announces its choice aloud, and the student joins the selected house. The Hat speaks to the student while they’re being sorted and is willing to take the student’s preferences into account when it makes its decision. Sometimes it does not have the need to do so.', NULL),

    ('Philosopher’s Stone', 'Legendary Magical Artifacts', 'It changes all metals to gold, and can be used to brew a potion called the Elixir of Life, making the drinker immortal', 'The Philosopher’s Stone was a legendary alchemical substance with magical properties. This ruby-red stone could be used to create the Elixir of Life, which made the drinker immortal, as well as transform any metal into pure gold.', NULL),

    ('Tom Riddle’s diary', 'Horcruxes', 'It is used to store part of a person’s soul, protecting him or her from death', 'Tom Riddle created his first Horcrux during his fifth year at Hogwarts, using his own school diary. He cast the spell after murdering his fellow student Myrtle Warren using the Basilisk. The diary is introduced in the thirteenth chapter of Chamber of Secrets and is destroyed by Harry Potter during the climax of the same book.', '1993/04/29'),

    ('Marvolo Gaunt’s Ring', 'Horcruxes', 'It is used to store part of a person’s soul, protecting him or her from death', 'Tom Riddle created his second Horcrux using a ring owned by his maternal grandfather, Marvolo Gaunt, during the summer before his sixth year as a student at Hogwarts, when he was fifteen years old. The murder that created the Horcrux was that of his father.', '1996/07/15'),

    ('Helga Hufflepuff’s Cup', 'Horcruxes', 'It is used to store part of a person’s soul, protecting him or her from death', 'Helga Hufflepuff’s Cup was a magical item created by one of the founders of Hogwarts School of Witchcraft and Wizardry, Helga Hufflepuff. It was a small golden cup with two finely-wrought handles with a badger engraved on the side and a few jewels. The badger is the symbol of Hufflepuff House.', '1998/04/2'),

    ('Salazar Slytherin’s Locket', 'Horcruxes', 'It is used to store part of a person’s soul, protecting him or her from death', 'Slytherin’s Locket was a piece of jewellery originally owned by Salazar Slytherin that became an heirloom of his family. It was a locket of heavy gold with a serpentine S in glittering green stone inlay on the front.', '1997/12/28'),

    ('Rowena Ravenclaw’s Diadem', 'Horcruxes', 'It is used to store part of a person’s soul, protecting him or her from death', 'Ravenclaw’s Diadem (also known as the Lost Diadem of Ravenclaw) was the only known relic once belonging to Rowena Ravenclaw, the founder of Ravenclaw House at Hogwarts School of Witchcraft and Wizardry. Etched upon its surface was Ravenclaw’s famous quote: ’Wit beyond measure is man’s greatest treasure.’', '1998/04/2'),

    ('Nagini', 'Horcruxes', 'It is used to store part of a person’s soul, protecting him or her from death', 'Nagini (d. 2 May, 1998) was a female Maledictus cursed to transform into a snake. Originating possibly in Indonesia, by 1927 she was a performer at the Circus Arcanus where she met Credence Barebone and had the ability then to transform at will. By 1994, Nagini was seemingly trapped in snake form and belonged to Lord Voldemort, with whom she had a special bond largely due to becoming a Horcrux, after her master had killed Bertha Jorkins in 1994.', '1998/04/2'),

    ('Harry Potter as a Horcrux', 'Horcruxes', 'It is used to store part of a person’s soul, protecting him or her from death', 'As a baby, Harry was in the room when Voldemort’s fatal Killing Curse backfired. Voldemort’s soul had been weakened and destabilised by his continuous murders and the creation of his previous Horcruxes. Harry became a Horcrux when a fragment of Voldemort’s soul attached itself to him after the unsuccessful curse. The lightning bolt-shaped scar on Harry’s forehead is a direct result of this attempted murder, and the connection that formed as a result is used to explain several important plot points.', '1998/04/2');
GO


INSERT INTO dbo.MagicalCreature
    (MagicalCreatureName, MagicalCreatureAppearance, MagicalCreatureAbilities, MagicalCreatureTypicalHabitat)
VALUES
    ('House-elves', 'Large heads, long noses and fingers, very short, with bulging, tennis ball eyes and bat-like ears', 'Their own type of magic performed without a wand which includes the ability to apparate, disarm and make objects levitate', 'Owner’s home'),

    ('Hippogriffs', 'A cross between a horse and an eagle', 'Proud creatures prone to attack if they are not shown respect, with razor-sharp beaks and foot-long talons', 'The Forbidden Forest'),

    ('Merpeople', 'Half fish, half human, grey skin, dark green hair, yellow eyes and teeth', 'Warlike tendencies, can drag people to their deaths underwater', 'An underwater colony in the Great Lake at Hogwarts'),

    ('Boggarts', 'Your worst fears', 'Transforms into the darkest fear of the person who sees it', 'Dark, confined spaces like bedroom cupboards'),

    ('Dementors', 'Shaped like humans covered in dark hooded cloaks, their skin resembles that of a grey rotting body', 'Though they are blind, they can sense and feed on positive feelings, draining their victim’s happiness', 'Azkaban'),

    ('Pixies', 'Electric blue, reaching up to eight inches in height, and wingless', 'Can fly, and can carry the weight of a human in spite of their miniature size', 'Cornwall, England'),

    ('Unicorns', 'Pure-white horned horse, foals are golden and then turn silver before reaching adulthood', 'The horn, hair and blood all possess highly magical properties', 'Usually found in forests throughout Northern Europe'),

    ('Werewolves', 'Werewolves are lycanthropes, and can infect others with their bite', 'Painful transformation, ability to infect others', 'During a full moon');
GO


INSERT INTO dbo.Spell
    (SpellName, SpellPurpose)
VALUES
    ('Crucio', 'To inflict excruciating pain on the victim'),
    ('Avada Kedavra', 'Instant death'),
    ('Homenum Revelio', 'To reveal the presence of other humans'),
    ('Protego Totalum', 'To shield an area and protect the people in it'),
    ('Expelliarmus', 'To remove an object (often a wand) from the recipient’s hand'),
    ('Imperio', 'To make someone do exactly what you want'),
    ('Stupefy', 'To stun an opponent, rendering them unconscious'),
    ('Impedimenta', 'To stop or slow down any person or creature by temporarily immobilising them'),
    ('Petrificus Totalus', 'To temporarily paralyse someone'),
    ('Alohomora', 'To open a locked door, window or object'),
    ('Lumos', 'To light up dark places at the flick of a wand'),
    ('Wingardium Leviosa', 'To levitate objects'),
    ('Obliviate', 'To erase, or modify the memory of another'),
    ('Protego', 'To cast a shield to protect a wizard'),
    ('Nox', 'To extinguish wandlight after the use of Lumos'),
    ('Unbreakable Vow', 'To bind a fellow wizard to a promise'),
    ('Morsmordre', 'Morsmordre'),
    ('Expecto Patronum', 'To protect against Dementors by summoning ones memories'),
    ('Riddikulus', 'To battle a Boggart');
GO

INSERT INTO dbo.MagicalCreature_In_Movie
    (FK_MagicalCreatureID, FK_MovieID)
VALUES
    (1, 2),
    (1, 4),
    (1, 5),
    (2, 3),
    (2, 4),
    (3, 4),
    (4, 3),
    (4, 4),
    (5, 3),
    (5, 4),
    (5, 5),
    (6, 2),
    (6, 5),
    (6, 6),
    (7, 1),
    (7, 4),
    (7, 6),
    (8, 1),
    (8, 2),
    (8, 3),
    (8, 5),
    (8, 6),
    (8, 7),
    (8, 8)
GO

INSERT INTO dbo.MagicalObject_In_Movie
    (FK_MagicalObjectID, FK_MovieID)
VALUES
    (1, 6),
    (1, 7),
    (1, 8),
    (2, 4),
    (2, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (3, 1),
    (3, 2),
    (3, 3),
    (3, 4),
    (3, 6),
    (3, 7),
    (3, 8),
    (4, 1),
    (4, 7),
    (4, 8),
    (5, 1),
    (6, 3),
    (6, 5),
    (6, 6),
    (6, 7),
    (6, 8),
    (7, 2),
    (7, 5),
    (8, 1),
    (8, 5),
    (8, 6),
    (8, 8),
    (9, 4),
    (10, 1),
    (10, 2),
    (10, 4),
    (10, 5),
    (10, 6),
    (10, 8),
    (11, 1),
    (12, 2),
    (12, 6),
    (12, 7),
    (12, 8),
    (13, 6),
    (13, 7),
    (13, 8),
    (14, 6),
    (14, 8),
    (15, 6),
    (15, 7),
    (15, 8),
    (16, 6),
    (16, 8),
    (17, 4),
    (17, 5),
    (17, 6),
    (17, 7),
    (17, 8),
    (18, 1),
    (18, 2),
    (18, 3),
    (18, 4),
    (18, 5),
    (18, 6),
    (18, 7),
    (18, 8)
GO

INSERT INTO dbo.Spell_In_Movie
    (FK_SpellID, FK_MovieID)
    VALUES
    (1, 1),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (2, 1),
    (2, 2),
    (2, 4),
    (2, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (3, 1),
    (3, 2),
    (3, 7),
    (4, 7),
    (5, 2),
    (5, 3),
    (5, 4),
    (5, 5),
    (5, 6),
    (5, 7),
    (5, 8),
    (6, 4),
    (6, 6),
    (6, 7),
    (6, 8),
    (7, 3),
    (7, 4),
    (7, 5),
    (7, 6),
    (7, 7),
    (7, 8),
    (8, 3),
    (8, 4),
    (8, 5),
    (8, 6),
    (8, 7),
    (8, 8),
    (9, 1),
    (9, 2),
    (9, 3),
    (9, 4),
    (9, 5),
    (9, 6),
    (9, 7),
    (9, 8),
    (10, 1),
    (10, 2),
    (10, 3),
    (10, 4),
    (10, 5),
    (10, 6),
    (10, 7),
    (10, 8),
    (11, 1),
    (11, 2),
    (11, 3),
    (11, 4),
    (11, 5),
    (11, 6),
    (11, 7),
    (11, 8),
    (12, 1),
    (12, 2),
    (12, 3),
    (12, 4),
    (12, 5),
    (12, 6),
    (12, 7),
    (12, 8),
    (13, 1),
    (13, 2),
    (13, 3),
    (13, 4),
    (13, 5),
    (13, 6),
    (13, 7),
    (14, 4),
    (14, 5),
    (14, 6),
    (14, 7),
    (14, 8),
    (15, 3),
    (15, 5),
    (15, 7),
    (16, 6),
    (17, 4),
    (17, 6),
    (17, 7),
    (17, 8),
    (18, 3),
    (18, 4),
    (18, 5),
    (18, 6),
    (18, 7),
    (18, 8), 
    (19, 3),
    (19, 4),
    (19, 5)
GO


INSERT INTO dbo.hpUser 
    (hpUserEmail, hpPwHash) 
VALUES 
    ('admin@email.com', '$2a$10$W9WUf0ZDsIkjUESnZwCaj.hFFUB.LaGDYkalRdrFhyDpor0NQBN6G')
GO


SELECT *
FROM dbo.Movie
SELECT *
FROM dbo.Character
SELECT *
FROM dbo.House
SELECT *
FROM dbo.Character_In_Movie
SELECT *
FROM dbo.Student_In_House
SELECT *
FROM dbo.Character_Staff
SELECT *
FROM dbo.MagicalObject
SELECT *
FROM dbo.MagicalCreature
SELECT *
FROM dbo.Spell
SELECT *
FROM dbo.MagicalObject_In_Movie
SELECT *
FROM dbo.MagicalCreature_In_Movie
SELECT *
FROM dbo.Spell_In_Movie
SELECT *
FROM dbo.hpUser