import AssassinFront from './assassin_front.png';
import AssassinBack from './assassin_back.png';
import BowmanFront from './bowman_front.png';
import BowmanBack from './bowman_back.png';
import ChampionFront from './champion_front.png';
import ChampionBack from './champion_back.png';
import DragoonFront from './dragoon_front.png';
import DragoonBack from './dragoon_back.png';
import DukeFront from './duke_front.png';
import DukeBack from './duke_back.png';
import FootmanFront from './footman_front.png';
import FootmanBack from './footman_back.png';
import GeneralFront from './general_front.png';
import GeneralBack from './general_back.png';
import KnightFront from './knight_front.png';
import KnightBack from './knight_back.png';
import LongbowmanFront from './longbowman_front.png';
import LongbowmanBack from './longbowman_back.png';
import MarshallFront from './marshall_front.png';
import MarshallBack from './marshall_back.png';
import PikemanFront from './pikeman_front.png';
import PikemanBack from './pikeman_back.png';
import PriestFront from './priest_front.png';
import PriestBack from './priest_back.png';
import RangerFront from './ranger_front.png';
import RangerBack from './ranger_back.png';
import SeerFront from './seer_front.png';
import SeerBack from './seer_back.png';
import WizardFront from './wizard_front.png';
import WizardBack from './wizard_back.png';
import AssassinFrontBlack from './black/assassin_front.png';
import AssassinBackBlack from './black/assassin_back.png';
import BowmanFrontBlack from './black/bowman_front.png';
import BowmanBackBlack from './black/bowman_back.png';
import ChampionFrontBlack from './black/champion_front.png';
import ChampionBackBlack from './black/champion_back.png';
import DragoonFrontBlack from './black/dragoon_front.png';
import DragoonBackBlack from './black/dragoon_back.png';
import DukeFrontBlack from './black/duke_front.png';
import DukeBackBlack from './black/duke_back.png';
import FootmanFrontBlack from './black/footman_front.png';
import FootmanBackBlack from './black/footman_back.png';
import GeneralFrontBlack from './black/general_front.png';
import GeneralBackBlack from './black/general_back.png';
import KnightFrontBlack from './black/knight_front.png';
import KnightBackBlack from './black/knight_back.png';
import LongbowmanFrontBlack from './black/longbowman_front.png';
import LongbowmanBackBlack from './black/longbowman_back.png';
import MarshallFrontBlack from './black/marshall_front.png';
import MarshallBackBlack from './black/marshall_back.png';
import PikemanFrontBlack from './black/pikeman_front.png';
import PikemanBackBlack from './black/pikeman_back.png';
import PriestFrontBlack from './black/priest_front.png';
import PriestBackBlack from './black/priest_back.png';
import RangerFrontBlack from './black/ranger_front.png';
import RangerBackBlack from './black/ranger_back.png';
import SeerFrontBlack from './black/seer_front.png';
import SeerBackBlack from './black/seer_back.png';
import WizardFrontBlack from './black/wizard_front.png';
import WizardBackBlack from './black/wizard_back.png';
import BagClosed from './paper-bag-folded.png'
import BagOpen from './paper-bag-open.png'
import BagEmpty from './paper-bag-crumpled.png'
import BagClosedBlack from './black/paper-bag-folded-black.png'
import BagOpenBlack from './black/paper-bag-open-black.png'
import BagEmptyBlack from './black/paper-bag-crumpled-black.png'

const loaded = {
  AssassinFront: false,
  AssassinBack: false,
  BowmanFront: false,
  BowmanBack: false,
  ChampionFront: false,
  ChampionBack: false,
  DragoonFront: false,
  DragoonBack: false,
  DukeFront: false,
  DukeBack: false,
  FootmanFront: false,
  FootmanBack: false,
  GeneralFront: false,
  GeneralBack: false,
  KnightFront: false,
  KnightBack: false,
  LongbowmanFront: false,
  LongbowmanBack: false,
  MarshallFront: false,
  MarshallBack: false,
  PikemanFront: false,
  PikemanBack: false,
  PriestFront: false,
  PriestBack: false,
  RangerFront: false,
  RangerBack: false,
  SeerFront: false,
  SeerBack: false,
  WizardFront: false,
  WizardBack: false,
  AssassinFrontBlack: false,
  AssassinBackBlack: false,
  BowmanFrontBlack: false,
  BowmanBackBlack: false,
  ChampionFrontBlack: false,
  ChampionBackBlack: false,
  DragoonFrontBlack: false,
  DragoonBackBlack: false,
  DukeFrontBlack: false,
  DukeBackBlack: false,
  FootmanFrontBlack: false,
  FootmanBackBlack: false,
  GeneralFrontBlack: false,
  GeneralBackBlack: false,
  KnightFrontBlack: false,
  KnightBackBlack: false,
  LongbowmanFrontBlack: false,
  LongbowmanBackBlack: false,
  MarshallFrontBlack: false,
  MarshallBackBlack: false,
  PikemanFrontBlack: false,
  PikemanBackBlack: false,
  PriestFrontBlack: false,
  PriestBackBlack: false,
  RangerFrontBlack: false,
  RangerBackBlack: false,
  SeerFrontBlack: false,
  SeerBackBlack: false,
  WizardFrontBlack: false,
  WizardBackBlack: false,
  BagClosed: false,
  BagOpen: false,
  BagEmpty: false,
  BagClosedBlack: false,
  BagOpenBlack: false,
  BagEmptyBlack: false,
}

const AssassinFrontElement = window.document.createElement('img');
AssassinFrontElement.src = AssassinFront;
AssassinFrontElement.onload = () => {
  loaded.AssassinFront = true;
}

const AssassinBackElement = window.document.createElement('img');
AssassinBackElement.src = AssassinBack;
AssassinBackElement.onload = () => {
  loaded.AssassinBack = true;
}

const BowmanFrontElement = window.document.createElement('img');
BowmanFrontElement.src = BowmanFront;
BowmanFrontElement.onload = () => {
  loaded.BowmanFront = true;
}

const BowmanBackElement = window.document.createElement('img');
BowmanBackElement.src = BowmanBack;
BowmanBackElement.onload = () => {
  loaded.BowmanBack = true;
}

const ChampionFrontElement = window.document.createElement('img');
ChampionFrontElement.src = ChampionFront;
ChampionFrontElement.onload = () => {
  loaded.ChampionFront = true;
}

const ChampionBackElement = window.document.createElement('img');
ChampionBackElement.src = ChampionBack;
ChampionBackElement.onload = () => {
  loaded.ChampionBack = true;
}

const DragoonFrontElement = window.document.createElement('img');
DragoonFrontElement.src = DragoonFront;
DragoonFrontElement.onload = () => {
  loaded.DragoonFront = true;
}

const DragoonBackElement = window.document.createElement('img');
DragoonBackElement.src = DragoonBack;
DragoonBackElement.onload = () => {
  loaded.DragoonBack = true;
}

const DukeFrontElement = window.document.createElement('img');
DukeFrontElement.src = DukeFront;
DukeFrontElement.onload = () => {
  loaded.DukeFront = true;
}

const DukeBackElement = window.document.createElement('img');
DukeBackElement.src = DukeBack;
DukeBackElement.onload = () => {
  loaded.DukeBack = true;
}

const FootmanFrontElement = window.document.createElement('img');
FootmanFrontElement.src = FootmanFront;
FootmanFrontElement.onload = () => {
  loaded.FootmanFront = true;
}

const FootmanBackElement = window.document.createElement('img');
FootmanBackElement.src = FootmanBack;
FootmanBackElement.onload = () => {
  loaded.FootmanBack = true;
}

const GeneralFrontElement = window.document.createElement('img');
GeneralFrontElement.src = GeneralFront;
GeneralFrontElement.onload = () => {
  loaded.GeneralFront = true;
}

const GeneralBackElement = window.document.createElement('img');
GeneralBackElement.src = GeneralBack;
GeneralBackElement.onload = () => {
  loaded.GeneralBack = true;
}

const KnightFrontElement = window.document.createElement('img');
KnightFrontElement.src = KnightFront;
KnightFrontElement.onload = () => {
  loaded.KnightFront = true;
}

const KnightBackElement = window.document.createElement('img');
KnightBackElement.src = KnightBack;
KnightBackElement.onload = () => {
  loaded.KnightBack = true;
}

const LongbowmanFrontElement = window.document.createElement('img');
LongbowmanFrontElement.src = LongbowmanFront;
LongbowmanFrontElement.onload = () => {
  loaded.LongbowmanFront = true;
}

const LongbowmanBackElement = window.document.createElement('img');
LongbowmanBackElement.src = LongbowmanBack;
LongbowmanBackElement.onload = () => {
  loaded.LongbowmanBack = true;
}

const MarshallFrontElement = window.document.createElement('img');
MarshallFrontElement.src = MarshallFront;
MarshallFrontElement.onload = () => {
  loaded.MarshallFront = true;
}

const MarshallBackElement = window.document.createElement('img');
MarshallBackElement.src = MarshallBack;
MarshallBackElement.onload = () => {
  loaded.MarshallBack = true;
}

const PikemanFrontElement = window.document.createElement('img');
PikemanFrontElement.src = PikemanFront;
PikemanFrontElement.onload = () => {
  loaded.PikemanFront = true;
}

const PikemanBackElement = window.document.createElement('img');
PikemanBackElement.src = PikemanBack;
PikemanBackElement.onload = () => {
  loaded.PikemanBack = true;
}

const PriestFrontElement = window.document.createElement('img');
PriestFrontElement.src = PriestFront;
PriestFrontElement.onload = () => {
  loaded.PriestFront = true;
}

const PriestBackElement = window.document.createElement('img');
PriestBackElement.src = PriestBack;
PriestBackElement.onload = () => {
  loaded.PriestBack = true;
}

const RangerFrontElement = window.document.createElement('img');
RangerFrontElement.src = RangerFront;
RangerFrontElement.onload = () => {
  loaded.RangerFront = true;
}

const RangerBackElement = window.document.createElement('img');
RangerBackElement.src = RangerBack;
RangerBackElement.onload = () => {
  loaded.RangerBack = true;
}

const SeerFrontElement = window.document.createElement('img');
SeerFrontElement.src = SeerFront;
SeerFrontElement.onload = () => {
  loaded.SeerFront = true;
}

const SeerBackElement = window.document.createElement('img');
SeerBackElement.src = SeerBack;
SeerBackElement.onload = () => {
  loaded.SeerBack = true;
}

const WizardFrontElement = window.document.createElement('img');
WizardFrontElement.src = WizardFront;
WizardFrontElement.onload = () => {
  loaded.WizardFront = true;
}

const WizardBackElement = window.document.createElement('img');
WizardBackElement.src = WizardBack;
WizardBackElement.onload = () => {
  loaded.WizardBack = true;
}

const AssassinFrontElementBlack = window.document.createElement('img');
AssassinFrontElementBlack.src = AssassinFrontBlack;
AssassinFrontElementBlack.onload = () => {
  loaded.AssassinFrontBlack = true;
}

const AssassinBackElementBlack = window.document.createElement('img');
AssassinBackElementBlack.src = AssassinBackBlack;
AssassinBackElementBlack.onload = () => {
  loaded.AssassinBackBlack = true;
}

const BowmanFrontElementBlack = window.document.createElement('img');
BowmanFrontElementBlack.src = BowmanFrontBlack;
BowmanFrontElementBlack.onload = () => {
  loaded.BowmanFrontBlack = true;
}

const BowmanBackElementBlack = window.document.createElement('img');
BowmanBackElementBlack.src = BowmanBackBlack;
BowmanBackElementBlack.onload = () => {
  loaded.BowmanBackBlack = true;
}

const ChampionFrontElementBlack = window.document.createElement('img');
ChampionFrontElementBlack.src = ChampionFrontBlack;
ChampionFrontElementBlack.onload = () => {
  loaded.ChampionFrontBlack = true;
}

const ChampionBackElementBlack = window.document.createElement('img');
ChampionBackElementBlack.src = ChampionBackBlack;
ChampionBackElementBlack.onload = () => {
  loaded.ChampionBackBlack = true;
}

const DragoonFrontElementBlack = window.document.createElement('img');
DragoonFrontElementBlack.src = DragoonFrontBlack;
DragoonFrontElementBlack.onload = () => {
  loaded.DragoonFrontBlack = true;
}

const DragoonBackElementBlack = window.document.createElement('img');
DragoonBackElementBlack.src = DragoonBackBlack;
DragoonBackElementBlack.onload = () => {
  loaded.DragoonBackBlack = true;
}

const DukeFrontElementBlack = window.document.createElement('img');
DukeFrontElementBlack.src = DukeFrontBlack;
DukeFrontElementBlack.onload = () => {
  loaded.DukeFrontBlack = true;
}

const DukeBackElementBlack = window.document.createElement('img');
DukeBackElementBlack.src = DukeBackBlack;
DukeBackElementBlack.onload = () => {
  loaded.DukeBackBlack = true;
}

const FootmanFrontElementBlack = window.document.createElement('img');
FootmanFrontElementBlack.src = FootmanFrontBlack;
FootmanFrontElementBlack.onload = () => {
  loaded.FootmanFrontBlack = true;
}

const FootmanBackElementBlack = window.document.createElement('img');
FootmanBackElementBlack.src = FootmanBackBlack;
FootmanBackElementBlack.onload = () => {
  loaded.FootmanBackBlack = true;
}

const GeneralFrontElementBlack = window.document.createElement('img');
GeneralFrontElementBlack.src = GeneralFrontBlack;
GeneralFrontElementBlack.onload = () => {
  loaded.GeneralFrontBlack = true;
}

const GeneralBackElementBlack = window.document.createElement('img');
GeneralBackElementBlack.src = GeneralBackBlack;
GeneralBackElementBlack.onload = () => {
  loaded.GeneralBackBlack = true;
}

const KnightFrontElementBlack = window.document.createElement('img');
KnightFrontElementBlack.src = KnightFrontBlack;
KnightFrontElementBlack.onload = () => {
  loaded.KnightFrontBlack = true;
}

const KnightBackElementBlack = window.document.createElement('img');
KnightBackElementBlack.src = KnightBackBlack;
KnightBackElementBlack.onload = () => {
  loaded.KnightBackBlack = true;
}

const LongbowmanFrontElementBlack = window.document.createElement('img');
LongbowmanFrontElementBlack.src = LongbowmanFrontBlack;
LongbowmanFrontElementBlack.onload = () => {
  loaded.LongbowmanFrontBlack = true;
}

const LongbowmanBackElementBlack = window.document.createElement('img');
LongbowmanBackElementBlack.src = LongbowmanBackBlack;
LongbowmanBackElementBlack.onload = () => {
  loaded.LongbowmanBackBlack = true;
}

const MarshallFrontElementBlack = window.document.createElement('img');
MarshallFrontElementBlack.src = MarshallFrontBlack;
MarshallFrontElementBlack.onload = () => {
  loaded.MarshallFrontBlack = true;
}

const MarshallBackElementBlack = window.document.createElement('img');
MarshallBackElementBlack.src = MarshallBackBlack;
MarshallBackElementBlack.onload = () => {
  loaded.MarshallBackBlack = true;
}

const PikemanFrontElementBlack = window.document.createElement('img');
PikemanFrontElementBlack.src = PikemanFrontBlack;
PikemanFrontElementBlack.onload = () => {
  loaded.PikemanFrontBlack = true;
}

const PikemanBackElementBlack = window.document.createElement('img');
PikemanBackElementBlack.src = PikemanBackBlack;
PikemanBackElementBlack.onload = () => {
  loaded.PikemanBackBlack = true;
}

const PriestFrontElementBlack = window.document.createElement('img');
PriestFrontElementBlack.src = PriestFrontBlack;
PriestFrontElementBlack.onload = () => {
  loaded.PriestFrontBlack = true;
}

const PriestBackElementBlack = window.document.createElement('img');
PriestBackElementBlack.src = PriestBackBlack;
PriestBackElementBlack.onload = () => {
  loaded.PriestBackBlack = true;
}

const RangerFrontElementBlack = window.document.createElement('img');
RangerFrontElementBlack.src = RangerFrontBlack;
RangerFrontElementBlack.onload = () => {
  loaded.RangerFrontBlack = true;
}

const RangerBackElementBlack = window.document.createElement('img');
RangerBackElementBlack.src = RangerBackBlack;
RangerBackElementBlack.onload = () => {
  loaded.RangerBackBlack = true;
}

const SeerFrontElementBlack = window.document.createElement('img');
SeerFrontElementBlack.src = SeerFrontBlack;
SeerFrontElementBlack.onload = () => {
  loaded.SeerFrontBlack = true;
}

const SeerBackElementBlack = window.document.createElement('img');
SeerBackElementBlack.src = SeerBackBlack;
SeerBackElementBlack.onload = () => {
  loaded.SeerBackBlack = true;
}

const WizardFrontElementBlack = window.document.createElement('img');
WizardFrontElementBlack.src = WizardFrontBlack;
WizardFrontElementBlack.onload = () => {
  loaded.WizardFrontBlack = true;
}

const WizardBackElementBlack = window.document.createElement('img');
WizardBackElementBlack.src = WizardBackBlack;
WizardBackElementBlack.onload = () => {
  loaded.WizardBackBlack = true;
}

const BagClosedElement = window.document.createElement('img');
BagClosedElement.src = BagClosed;
BagClosedElement.onload = () => {
  loaded.BagClosed = true;
}

const BagOpenElement = window.document.createElement('img');
BagOpenElement.src = BagOpen;
BagOpenElement.onload = () => {
  loaded.BagOpen = true;
}

const BagEmptyElement = window.document.createElement('img');
BagEmptyElement.src = BagEmpty;
BagEmptyElement.onload = () => {
  loaded.BagEmpty = true;
}

const BagClosedElementBlack = window.document.createElement('img');
BagClosedElementBlack.src = BagClosedBlack;
BagClosedElementBlack.onload = () => {
  loaded.BagClosedBlack = true;
}

const BagOpenElementBlack = window.document.createElement('img');
BagOpenElementBlack.src = BagOpenBlack;
BagOpenElementBlack.onload = () => {
  loaded.BagOpenBlack = true;
}

const BagEmptyElementBlack = window.document.createElement('img');
BagEmptyElementBlack.src = BagEmptyBlack;
BagEmptyElementBlack.onload = () => {
  loaded.BagEmptyBlack = true;
}

function allLoaded() {
  return Object.values(loaded).every(value => value);
}

export default {
  allLoaded,
  // Duke tile images
  AssassinFrontElement,
  AssassinBackElement,
  BowmanFrontElement,
  BowmanBackElement,
  ChampionFrontElement,
  ChampionBackElement,
  DragoonFrontElement,
  DragoonBackElement,
  DukeFrontElement,
  DukeBackElement,
  FootmanFrontElement,
  FootmanBackElement,
  GeneralFrontElement,
  GeneralBackElement,
  KnightFrontElement,
  KnightBackElement,
  LongbowmanFrontElement,
  LongbowmanBackElement,
  MarshallFrontElement,
  MarshallBackElement,
  PikemanFrontElement,
  PikemanBackElement,
  PriestFrontElement,
  PriestBackElement,
  RangerFrontElement,
  RangerBackElement,
  SeerFrontElement,
  SeerBackElement,
  WizardFrontElement,
  WizardBackElement,
  // black
  AssassinFrontElementBlack,
  AssassinBackElementBlack,
  BowmanFrontElementBlack,
  BowmanBackElementBlack,
  ChampionFrontElementBlack,
  ChampionBackElementBlack,
  DragoonFrontElementBlack,
  DragoonBackElementBlack,
  DukeFrontElementBlack,
  DukeBackElementBlack,
  FootmanFrontElementBlack,
  FootmanBackElementBlack,
  GeneralFrontElementBlack,
  GeneralBackElementBlack,
  KnightFrontElementBlack,
  KnightBackElementBlack,
  LongbowmanFrontElementBlack,
  LongbowmanBackElementBlack,
  MarshallFrontElementBlack,
  MarshallBackElementBlack,
  PikemanFrontElementBlack,
  PikemanBackElementBlack,
  PriestFrontElementBlack,
  PriestBackElementBlack,
  RangerFrontElementBlack,
  RangerBackElementBlack,
  SeerFrontElementBlack,
  SeerBackElementBlack,
  WizardFrontElementBlack,
  WizardBackElementBlack,
  // bag images
  BagClosedElement,
  BagOpenElement,
  BagEmptyElement,
  BagClosedElementBlack,
  BagOpenElementBlack,
  BagEmptyElementBlack,
}
