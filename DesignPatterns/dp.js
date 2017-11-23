/* Factory: A generic interface for creating objects */

/* Proxy: An object that controlls access to another object called
subject. It has the same interface as that of the subject.
Ways: Composition and Augmentation */

/* Decorator: Dynamically augmenting the behaviour of an existing
object.
Ways: Composition and augmentation */

/* Adapter: Access functionality of an object through a different
interface */

/* Strategy: Allows an object called context to support variations
in its logic by extracting the variable parts into separate, 
interchangeable objects called strategies.
Context object created is bound to a specific strategy
Constructor allows creation of contexts bound to different 
strategies */

/* State: Variation of strategy where strategy changes depending 
on the state of the context */

/* Template: Defining an abstract class that represents the 
skeleton of an algorithm where some of its steps are left undefined 
Achieved through Shadowing */

/* Middleware: Functions organized in a pipeline */

/*Command: Client -> Command -> Invoker -> Target
Invoker holds history of commands executed an can undo or delay execution*/