// tslint:disable:max-line-length
import * as Knex from 'knex';
import { Tables } from '../../core/Tables';
import { DontBeAModel } from '../../models/DontBeAModel';

exports.seed = async (db: Knex) => {
  const data = [
    {
      phrase: 'Don\'t be rediculous',
      episodeNo: 'S01E04',
      episodeTitle: 'Woman Seeking Dead Husband - Smokers Okay, No Pets'
    },
    {
      phrase: 'Don\'t be a silly goose.',
      episodeNo: 'S01E05',
      episodeTitle: '9 Lives'
    },
    {
      phrase: 'Don\'t be a crazy hooligan.',
      episodeNo: 'S01E05',
      episodeTitle: '9 Lives'
    },
    {
      phrase: 'Don\'t be a gooey chocolate chip cookie.',
      episodeNo: 'S01E14',
      episodeTitle: 'Poker? I Barely Know Her'
    },
    {
      phrase: 'Don\'t be a rabid porcupine.',
      episodeNo: 'S02E01',
      episodeTitle: 'American Duos'
    },
    {
      phrase: 'Don\'t be a giant snapping turtle.',
      episodeNo: 'S02E02',
      episodeTitle: '65 Million Years Off'
    },
    {
      phrase: 'Don\'t be a paranoid schizophrenic.',
      episodeNo: 'S02E03',
      episodeTitle: 'Psy vs. Psy'
    },
    {
      phrase: 'Don\'t be a gloomy you.',
      episodeNo: 'S02E06',
      episodeTitle: 'Meat Is Murder, But Murder Is Also Murder'
    },
    {
      phrase: 'Don\'t be a Traveling Wilbury.',
      episodeNo: 'S02E16',
      episodeTitle: 'Shawn (and Gus) of the Dead'
    },
    {
      phrase: 'Don\'t be an incorrigible Eskimo pie with a caramel ribbon.',
      episodeNo: 'S03E02',
      episodeTitle: 'Murder? ... Anyone? ... Anyone? ... Bueller?'
    },
    {
      phrase: 'Don\'t be an old sponge with hair hanging off of it.',
      episodeNo: 'S03E03',
      episodeTitle: 'Daredevils!'
    },
    {
      phrase: 'Don\'t be a myopic chihuahua.',
      episodeNo: 'S03E06',
      episodeTitle: 'There Might Be Blood'
    },
    {
      phrase: 'Don\'t be exactly half of an eleven-pound black forest ham.',
      episodeNo: 'S03E10',
      episodeTitle: 'Six Feet Under the Sea'
    },
    {
      phrase: 'Don\'t be William Zabka from \'Back To School\'.',
      episodeNo: 'S03E12',
      episodeTitle: 'Earth, Wind, and... Wait for It'
    },
    {
      phrase: 'Don\'t be this crevice in my arm.',
      episodeNo: 'S03E14',
      episodeTitle: 'Truer Lies'
    },
    {
      phrase: 'Don\'t be the last of the famous international playboys.',
      episodeNo: 'S03E16',
      episodeTitle: 'An Evening With Mr. Yang'
    },
    {
      phrase: 'Don\'t be principal and interest.',
      episodeNo: 'S04E02',
      episodeTitle: 'He Dead'
    },
    {
      phrase: 'Don\'t be the ribs that flip over Fred Flintstone\'s car.',
      episodeNo: 'S04E05',
      episodeTitle: 'Shawn Gets the Yips'
    },
    {
      phrase: 'Don\'t be \'Harry Potter and the Prisoner of Marzipan\'.',
      episodeNo: 'S04E06',
      episodeTitle: 'Bollywood Homicide'
    },
    {
      phrase: 'Don\'t be the American adaptation of the British Gus.',
      episodeNo: 'S04E07',
      episodeTitle: 'High Top Fade Out'
    },
    {
      phrase: 'Don\'t be the third Thompson Twin with the dreads.',
      episodeNo: 'S04E08',
      episodeTitle: 'Let\'s Get Hairy'
    },
    {
      phrase: 'Don\'t be the new Meshach Taylor.',
      episodeNo: 'S04E11',
      episodeTitle: 'Thrill Seekers and Hell Raisers'
    },
    {
      phrase: 'Don\'t be the \'iiiiit\' in \'wait for iiiit\'.',
      episodeNo: 'S04E12',
      episodeTitle: 'A Very Juliet Episode'
    },
    {
      phrase: 'Don\'t be Nic Cage\'s accent from Con Air',
      episodeNo: 'S04E13',
      episodeTitle: 'Death Is in the Air'
    },
    {
      phrase: 'Don\'t be Leon from the \'Like a Prayer\' video.',
      episodeNo: 'S04E15',
      episodeTitle: 'The Head, The Tail, The Whole Damn Episode'
    },
    {
      phrase: 'Don\'t be Topher Grace running on the beach at the end of \'In Good Company\'.',
      episodeNo: 'S04E16',
      episodeTitle: 'Mr. Yin Presents...'
    },
    {
      phrase: 'Don\'t be the ten tigers of Canton.',
      episodeNo: 'S05E01',
      episodeTitle: 'Romeo and Juliet and Juliet'
    },
    {
      phrase: 'Don\'t be Canada.',
      episodeNo: 'S05E02',
      episodeTitle: 'Feet Don\'t Kill Me Now'
    },
    {
      phrase: 'Don\'t be George Hamilton\'s reaction when Ashley came to him and said \'Dad, I think I\'ll become an actor, too\'.',
      episodeNo: 'S05E04',
      episodeTitle: 'Chivalry Is Not Dead... But Someone Is'
    },
    {
      phrase: 'Don\'t be the second drummer from 38 Special.',
      episodeNo: 'S05E05',
      episodeTitle: 'Shawn and Gus in Drag (Racing)'
    },
    {
      phrase: 'Don\'t be the one game at Chuck E. Cheese that isn\'t broken.',
      episodeNo: 'S05E07',
      episodeTitle: 'Ferry Tale'
    },
    {
      phrase: 'Don\'t be Fine Young Cannibal\'s cover of Suspicious Minds.',
      episodeNo: 'S05E09',
      episodeTitle: 'One, Maybe Two, Ways Out'
    },
    {
      phrase: 'Don\'t be both Ashlee Simpson albums.',
      episodeNo: 'S05E10',
      episodeTitle: 'Extradition II: The Actual Extradition Part'
    },
    {
      phrase: 'Don\'t be the only black lead on a major cable network.',
      episodeNo: 'S05E11',
      episodeTitle: 'In Plain Fright'
    },
    {
      phrase: 'Don\'t be your jury summons that I accidentally threw away last month along with something called a w-2.',
      episodeNo: 'S05E11',
      episodeTitle: 'In Plain Fright'
    },
    {
      phrase: 'Don\'t be the scream from \'Holding Back the Years\'.',
      episodeNo: 'S05E12',
      episodeTitle: 'Dual Spires'
    },
    {
      phrase: 'Don\'t be the way Eriq Le Salle spells Eric.',
      episodeNo: 'S05E14',
      episodeTitle: 'The Polarizing Express'
    },
    {
      phrase: 'Don\'t be Keith Sweat now.',
      episodeNo: 'S05E14',
      episodeTitle: 'The Polarizing Express'
    },
    {
      phrase: 'Don\'t be the mystery mouske-tool.',
      episodeNo: 'S06E01',
      episodeTitle: 'Shawn Rescues Darth Vader'
    },
    {
      phrase: 'Don\'t be Pete Rose’s haircut.',
      episodeNo: 'S06E05',
      episodeTitle: 'Dead Man\'s Curve Ball'
    },
    {
      phrase: 'Don\'t be Lao Che.',
      episodeNo: 'S06E10',
      episodeTitle: 'Indiana Shawn and the Temple of the Kinda Crappy, Rusty Old Dagger'
    },
    {
      phrase: 'Don\'t be the b---- from apartment 23.',
      episodeNo: 'S07E02',
      episodeTitle: 'Juliet Takes a Luvvah'
    },
    {
      phrase: 'Don\'t be the Tom Selleck to her Paulina Porizkova.',
      episodeNo: 'S07E02',
      episodeTitle: 'Juliet Takes a Luvvah'
    },
    {
      phrase: 'Gus don\'t be the remake of Yours, Mine and Ours. While I am at it, don\'t be the original either.',
      episodeNo: 'S07E04',
      episodeTitle: 'No Country For Two Old Men'
    },
    {
      phrase: 'Don\'t be the second time ever I saw your face.',
      episodeNo: 'S07E05',
      episodeTitle: '100 Clues'
    },
    {
      phrase: 'Don\'t be Weepy Boy Santos.',
      episodeNo: 'S07E12',
      episodeTitle: 'Dead Air'
    },
    {
      phrase: 'Don\'t be the kites upon strings.',
      episodeNo: 'S07E15',
      episodeTitle: 'Psych: The Musical'
    },
    {
      phrase: 'Don\'t be the very model of a modern major general.',
      episodeNo: 'S07E15',
      episodeTitle: 'Psych: The Musical'
    },
    {
      phrase: 'Don\'t be The Howling to Your Sister\'s a Werewolf.',
      episodeNo: 'S08E01',
      episodeTitle: 'Lock, Stock, Some Smoking Barrels and Burton Guster\'s Goblet of Fire'
    },
    {
      phrase: 'Don\'t be the 100th Luftballoon.',
      episodeNo: 'S08E01',
      episodeTitle: 'S.E.I.Z.E. the Day'
    }
  ];
  const entries = data.map((d) => {
    return (new DontBeAModel())
      .setPhrase(d.phrase)
      .setEpisodeNo(d.episodeNo)
      .setEpisodeTitle(d.episodeTitle)
      .toDatabaseObject();
  });

  return await db(Tables.DontBeA).insert(entries);
};
