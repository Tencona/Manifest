# Manifest

Manifest is a tool developed originally for Dungeon/Game Masters but it's expanded to fit many roles.

Manifest is comprised of three models: Type, Property, and Item.
Using those three components, a developer can easily create endlessly nested classes of inheritance with the ability to quickly generate any number of Items using known values of the same Type.
[Examples.](##Examples)

## Models

### Type

A Type is the idea of what makes up something - it's essentially a template.

### Property

Properties are the descriptors for what every instance of a Type will have. A Property is like an input on a form without a value. They have a specified data type and can test values against a validation function.

### Item

A real instance of a Type. This is a Type given form, with values for the associated Properties. When an Item is initialized, it gets the full inheritence of its Type's Properties

## Examples

The examples below show how NPC, Monster, and Player Character share a parent but have different properties.

### Types
Types are the templates for Items
```
* Actor
	* Humanoid
		* NPC
		* Player Character
	* Animal
		* Mammal
		* Vertebrate
		* Insect
		* Reptile
		* Tardigrade
```

### Properties
Properties are the defintion of what makes up a Type.
> Distinct Properties

```
* Actor
	* Name
	* Age
	* Height
	* Weight
	* Location
	* Traits
* Humanoid - A Type can have no extra Properties, being used purely for organizational purposes
	* ParentType: Actor
* NPC
	* ParentType: Humanoid
	* Quests
	* Secrets
* Player Character
	* ParentType: Humanoid
	* Player Name
	* Phone Number
	* Email
	* Character Sheet
```

> Rolled Up Properties

```
* Actor
	* Name
	* Age
	* Height
	* Weight
	* Location
	* Traits
* Humanoid - A Type can have no extra Properties, being used purely for organizational purposes
	* ParentType: Actor
	* [...Actor Traits]
* NPC
	* ParentType: Humanoid
	* [...Actor Traits]
	* Quests
	* Secrets
* Player Character
	* ParentType: Humanoid
	* Name
	* Age
	* Height
	* Weight
	* Location
	* Traits
	* Player Name
	* Phone Number
	* Email
	* Character Sheet
```

### Item
Here's what an Item would look like for my D&D character
```
* Type: Player Character
* Name: Amon
* Age: 26
* Height: 3'1"
* Weight: 41 lbs
* Location: Beleron
* Traits: "Studious, experimental, and a coward"
* Player Name: Conner Tennery
* Phone Number: 123-456-7890
* Email: ctennery.dev@gmail.com
* Character Sheet: {link to sheet}
```


## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```
