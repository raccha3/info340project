export const endMobs = [
	{
		id: 201,
		name: "Enderman",
		hostility: "neutral",
		world: "End",
		biomes: ["Main Island", "Outer Islands"],
		goal: "Farm ender pearls for teleporting and progression.",
		image: "/assets/mobs/enderman.png",
		drops: [
			{ item: "Ender Pearl", rate: "100%" },
			{ item: "Enderman Head", rate: "very rare" },
		],
	},
	{
		id: 202,
		name: "Shulker",
		hostility: "hostile",
		world: "End",
		biomes: ["End City"],
		goal: "Collect shulker shells for shulker boxes.",
		image: "/assets/mobs/shulker.png",
		drops: [
			{ item: "Shulker Shell", rate: "100%" },
		],
	},
	{
		id: 203,
		name: "Ender Dragon",
		hostility: "hostile",
		world: "End",
		biomes: ["Main Island"],
		goal: "Defeat the dragon to unlock the End gateway.",
		image: "/assets/mobs/ender-dragon.png",
		drops: [
			{ item: "Dragon Egg", rate: "1 per fight" },
			{ item: "Experience Orbs", rate: "12000 XP" },
		],
	},
	{
		id: 204,
		name: "Endermite",
		hostility: "hostile",
		world: "End",
		biomes: ["Main Island"],
		goal: "Use endermites to build an Enderman farm (later).",
		image: "/assets/mobs/endermite.png",
		drops: [
			{ item: "Experience Orbs", rate: "3 XP" },
		],
	},
];
