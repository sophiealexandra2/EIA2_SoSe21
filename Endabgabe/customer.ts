namespace vegandoenerSimulator {
    export class Customer extends Entity {
    mood: Moods = Moods.Hungry;
    wants: Food; 
    readonly speed: number = 0.5; 
    status: customerStatus = customerStatus.ComingIn; 
    //Hier noch target position einfügen und etwas, womit ich die mood bestimmen kann??

}}
