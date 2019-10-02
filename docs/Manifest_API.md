# Public Structure/API

# Storage

- Types
    - ID
        - string, uuid
    - Name
        - string
    - ParentType
        - nullable Type
    - Properties
        - Array
    - PageLayout
        - ???
- Properties
    - ID
        - string, uuid
    - Name
        - string
    - DataType
        - options provided by Manifest (text, number, range, date, etc)
    - Validation
        - nullable function, provided by Manifest or user
- Items
    - ID
        - string, uuid
    - Type
        - ref Type
        - Items can't use a reference to their Type's Properties for storing values, they need an internal map of a Property and the value for it.
        - Should an Item be allowed to have multiple Types? There's not a huge reason to say no. Multiple inheritence can be useful.
    - Properties
        - Dictionary<Property ID, {ref Property, value}>
        - Using a Dictionary should allow for quick access to a Property by its ID alone

# Interaction

## Manifest

- Public Lists
    - Types
        - Array of every Type
    - Properties
        - Not sure why the user wants to access Properties directly, but okay
    - Items
        - Array of every Item
- Public Models
    - Type
    - Properties
    - Items
- Type Functions
    - addType(string name)
    - removeType(string id) (string name) (Type type)
        - Name is viable and required to be unique because it's describing a concept/template. Those shouldn't overlap by name.
    - getType(string id) (string name)
- Property Functions
    - addProperty(Type type, Property property)
        - Property will be checked if it's valid before being added
    - removeProperty(Type type, Property property) (Type type, string id) (Type type, string name) (Property property) (string id)
    - getProperty(string id)
        - Can't do (string name) because there's likely to be duplicate names
    - getProperties(Type type)
- Item Functions
    - addItem(Item item)
        - Item will be checked to see if it's valid before being added
    - removeItem(Item item) (string id)
    - getItem(string id)
    - getItems(Type type)

---

## Type

- isValidItem()
    - returns true or false if the Type has all of the required properties

---

## Property

- isValidProperty()
    - returns true or false if the Property has all of the required properties
- validation
    - Function that can be used to test if a value is valid to be given to a Property
        - This is something like only numbers, only text, alphanumeric, character length, number range, etc. There will be built in functions available, but anything can be provided by a user as long as it returns true or false.
- testValue(obj value)
    - Used to test if a value will pass validation or not

---

## Item

- isValidItem()
    - returns true or false if the Item has all of the required properties
- setProperty(Property property, obj value)
    - Ensures the Property exists for that Type then runs Property.testValue(obj value) to make sure it's okay to have this value. If that all checks out, then the value is set