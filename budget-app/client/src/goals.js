import goalhouse from "./assets/goalhouse.png"
import goalvacation from "./assets/goalvacation.png"
import goalgift from "./assets/goalgift.png"
import goalcar from "./assets/goalcar.png"
import goaldebt from "./assets/goaldebt.png"
import goalcustom from "./assets/goalcustom.png"

export const goals = [
    { id: 'home', icon: goalhouse, text: 'Buy a House', selected: false, amount: '', isPrimary: false },
    { id: 'vacation', icon: goalvacation, text: 'Save for Vacation', selected: false, amount: '', isPrimary: false },
    { id: 'gift', icon: goalgift, text: 'Save for gifts', selected: false, amount: '', isPrimary: false },
    { id: 'car', icon: goalcar, text: 'Buy a Car', selected: false, amount: '', isPrimary: false },
    { id: 'debt', icon: goaldebt, text: 'Pay off debt', selected: false, amount: '', isPrimary: false },
    { id: 'custom', icon: goalcustom, text: 'Custom', selected: false, amount: '', isPrimary: false }
  ];
