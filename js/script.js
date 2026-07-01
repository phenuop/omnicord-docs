const commandData = [{
    name: "aliens",
    category: "User",
    description: "View and manage your alien collection with advanced filtering options.",
    usage: ".aliens [options]",
    aliases: ["al", "myaliens"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".aliens - View all your aliens",
        ".aliens atk:50 - Show aliens with 50+ attack",
        ".aliens rarity:mythic - Show only mythic rarity aliens"
    ],
    tips: [
        "Use filters to find specific aliens quickly",
        "Check your best aliens for battles"
    ],
    detailedInfo: {
        whatItDoes: "The `.aliens` command displays your entire alien collection in a paginated, organized format.",
        filters: [
            { name: "Stats", filter: "atk:X or attack:X", description: "Filter by attack stat" },
            { name: "Stats", filter: "def:X or defense:X", description: "Filter by defense stat" },
            { name: "Stats", filter: "spd:X or speed:X", description: "Filter by speed stat" },
            { name: "Stats", filter: "lvl:X or level:X", description: "Filter by level" },
            { name: "Stats", filter: "iv:X or dna:X", description: "Filter by DNA quality" },
            { name: "Other", filter: "n:X or name:X", description: "Search by alien name" },
            { name: "Other", filter: "r:X or rarity:X", description: "Filter by rarity" },
            { name: "Other", filter: "f:true or fav:true", description: "Show only favorites" },
            { name: "Other", filter: "nick:text", description: "Search by nickname" }
        ],
        examples: [
            ".aliens atk:50 f:true - Favorites with 50+ attack",
            ".aliens spd:30-50 r:rare - Rare aliens with speed 30-50",
            ".aliens nick:cool lvl:10 iv:>80 - Level 10+ aliens with DNA >80%"
        ]
    }
}, {
    name: "arena",
    category: "Combat",
    description: "Live random arena battles against anyone in the queue.",
    usage: ".arena [options]",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".arena - Check your arena stats",
        ".arena queue - Join the arena queue",
        ".arena leaderboard - View top arena players"
    ],
    tips: [
        "Live random battles against queued players",
        "Win more battles to become a Ranker",
        "Top 10 Rankers get special titles"
    ],
    detailedInfo: {
        whatItDoes: "The arena system allows you to battle live against random players who are in the queue. Win battles to climb the ranks and become a Ranker.",
        features: [
            "Live random matchmaking",
            "Queue system for fair matching",
            "Ranker system (Top 10 players)",
            "Special titles for Rankers",
            "Arena leaderboard"
        ],
        rankers: "Top 10 players in arena are called Rankers and get special titles based on their position. This is different from battle ranks."
    }
}, {
    name: "auction",
    category: "Economy",
    description: "List, bid on, and manage auctions for aliens and items with a full auction house system.",
    usage: ".auction <list|info|start|bid|remove> [args]",
    aliases: ["auc", "a"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".auction list - View all active auctions with pagination",
        ".auction start 5 5000 - Start auction for alien ID 5 at 5000 Tyden",
        ".auction bid 12345 5500 - Place bid of 5500 on auction #12345",
        ".auction info 12345 - View detailed info about auction #12345",
        ".auction remove 12345 - Remove your auction (if no bids placed)",
        ".auction buy 12345 - Buyout an auction instantly"
    ],
    tips: [
        "Set reasonable starting prices to attract bidders",
        "Auctions can last up to 10 days maximum",
        "You can set a buyout price for instant purchase",
        "Auctions can only be used in the support server",
        "Support Server: https://discord.gg/aqRYuq37SE"
    ],
    detailedInfo: {
        whatItDoes: "The auction system lets players list their aliens and items for others to bid on. It's a dynamic marketplace where supply and demand determine value.",
        subcommands: [
            { name: "list", description: "View all active auctions with pagination and filters" },
            { name: "list -mine", description: "View only your active auctions" },
            { name: "start", description: "Start an auction with <alien_id> <starting_bid> <duration_in_days>" },
            { name: "remove", description: "Remove your auction if no bids have been placed" },
            { name: "info", description: "View detailed information about a specific auction" },
            { name: "buy", description: "Buyout an auction instantly at the buyout price" },
            { name: "bid", description: "Place a bid on an active auction" }
        ],
        features: [
            "Time-limited auctions (up to 10 days)",
            "Minimum bid increments system",
            "Buyout options for instant purchase",
            "Auction history tracking",
            "Watchlist for favorite auctions"
        ],
        restrictions: [
            "Auctions can only be used in the support server",
            "Maximum auction duration is 10 days",
            "Cannot bid on your own auctions"
        ]
    }
}, {
    name: "balance",
    category: "Economy",
    description: "Check your Tyden and Nullite balance.",
    usage: ".balance",
    aliases: ["bal", "money"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".balance - Check your own balance"
    ],
    tips: [
        "Tyden is earned through battles, voting, events, and luckspin",
        "Use .shop to spend your currency",
        "Nullite is premium currency for special items",
        "Nullite can be exchanged using .buy nullite [amount]"
    ],
    detailedInfo: {
        whatItDoes: "Shows your current Tyden and Nullite balance with a clean, formatted display.",
        currency: {
            tyden: "Main currency earned through gameplay. Used for shop items, auctions, and trades. Earned from: battling, spawned villains, voting, events, and luckspin.",
            nullite: "Premium currency. Used for special items and rare purchases. Can be obtained through events or exchanged using `.buy nullite [amount]`."
        },
        features: [
            "View your own balance",
            "Track daily earnings",
            "View recent transactions"
        ]
    }
}, {
    name: "battle",
    category: "Combat",
    description: "Engage in turn-based battles against other users. Battle modes include 1v1, 3v3, and 4v4 team fights.",
    usage: ".battle [mode] @user",
    aliases: ["fight", "duel"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".battle 1v1 @user - Challenge someone to a 1v1",
        ".battle 3v3 @user - 3v3 battle (3 aliens fight 1 at a time)",
        ".battle 4v4 @user - 4v4 battle (4 aliens fight 2 at a time)"
    ],
    tips: [
        "Higher level aliens have better stats",
        "Use .moves to set up your alien's abilities before battle",
        "Team composition matters in 3v3 and 4v4 battles",
        "Type advantages can turn the tide"
    ],
    detailedInfo: {
        whatItDoes: "The `.battle` command starts a turn-based battle between you and another user. Select your aliens, choose moves, and battle strategically to win.",
        modes: [
            { name: "1v1", description: "Single alien vs single alien. Quickest battle mode. Best for testing individual alien strength." },
            { name: "3v3", description: "Three aliens vs three aliens. 1 alien fights at a time. Requires more strategy and team coordination." },
            { name: "4v4", description: "Four aliens vs four aliens. 2 aliens fight at a time. Full team battles with maximum strategic depth." }
        ],
        rewards: "Earn Tyden and experience from winning battles. Higher level and rarer aliens yield better rewards.",
        ranks: [
            { name: "Grand Master", emoji: "1433481166832271484", rating: "2500+", color: "#FFD700" },
            { name: "Master", emoji: "1433480016469037066", rating: "2000-2499", color: "#A020F0" },
            { name: "Diamond", emoji: "1433511799352983645", rating: "1500-1999", color: "#00BFFF" },
            { name: "Platinum", emoji: "1433479844620140676", rating: "1200-1499", color: "#E5E4E2" },
            { name: "Gold", emoji: "1433512086947762287", rating: "1000-1199", color: "#FFD700" },
            { name: "Silver", emoji: "1433512385485996053", rating: "800-999", color: "#C0C0C0" },
            { name: "Bronze", emoji: "1433479729595547668", rating: "600-799", color: "#CD7F32" },
            { name: "Iron", emoji: "1433479726105890918", rating: "0-599", color: "#808080" }
        ]
    }
}, {
    name: "bet",
    category: "Economy",
    description: "Bet Tyden against another user with various mini-games.",
    usage: ".bet <@user> <amount>",
    aliases: ["gamble", "wager"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".bet @user 500 - Challenge to a bet of 500 Tyden",
        ".bet @user 1000 - High stakes bet"
    ],
    tips: [
        "Both players must accept the bet",
        "Winner takes all",
        "Only bet what you can afford to lose"
    ],
    detailedInfo: {
        whatItDoes: "The bet system allows you to wager Tyden against other players in various mini-games. New games will be added over time.",
        games: [
            "Coin flip - 50/50 chance",
            "Number guess - Guess the correct number",
            "Dice roll - Higher roll wins",
            "More games coming soon!"
        ],
        rules: "Both players must agree to the bet amount and game type before playing. The winner takes the entire pot."
    }
}, {
    name: "botinfo",
    category: "Info",
    description: "Display bot information and statistics including uptime, commands, and server count.",
    usage: ".botinfo",
    aliases: ["stats", "about"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [".botinfo - View bot statistics"],
    tips: [
        "Shows real-time bot performance",
        "Includes total commands and servers",
        "Useful for checking bot status"
    ],
    detailedInfo: {
        whatItDoes: "Displays comprehensive information about the bot including uptime, command count, server count, user count, and more.",
        features: [
            "Uptime tracking",
            "Server statistics",
            "User statistics",
            "Command usage stats",
            "Version information"
        ]
    }
}, {
    name: "buy",
    category: "Economy",
    description: "Convert Tyden to Nullite.",
    usage: ".buy nullite <amount>",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".buy nullite 100 - Convert Tyden to 100 Nullite"
    ],
    tips: [
        "Exchange rate varies",
        "Nullite can be used in the shop",
        "Check shop for other purchases"
    ],
    detailedInfo: {
        whatItDoes: "Allows you to convert your Tyden into Nullite currency. Other items can be purchased through the shop command with select menus.",
        features: [
            "Tyden to Nullite conversion",
            "Exchange rate display",
            "Instant conversion"
        ]
    }
}, {
    name: "chapter",
    category: "Game",
    description: "Progress through story chapters to earn rewards and unlock new content.",
    usage: ".chapter [start <id>]",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".chapter - View your current chapter progress",
        ".chapter start 5 - Start chapter 5"
    ],
    tips: [
        "Chapters must be completed in order",
        "Higher chapters give better rewards",
        "Some aliens are only obtainable through chapters"
    ],
    detailedInfo: {
        whatItDoes: "Allows you to progress through the Omnicord story mode. Each chapter offers unique challenges and rewards.",
        features: [
            "Story-driven gameplay",
            "Unique challenges per chapter",
            "Rewards including aliens, fragments, and currency",
            "Chapter-specific achievements"
        ]
    }
}, {
    name: "combine",
    category: "Game",
    description: "Forge a new attack by combining two base attacks using an interactive select menu system.",
    usage: ".combine",
    aliases: ["forge", "synthesize", "synthesis", "ironworks", "smith", "smitting"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".combine - Open the combine menu to select attacks to combine"
    ],
    tips: [
        "Some combinations create rare attacks",
        "Not all attacks can be combined",
        "Combined attacks are often stronger",
        "Requirements: Nullite = Base damage × 0.8 + variance, Fusion Core required for 60+ DMG techniques"
    ],
    detailedInfo: {
        whatItDoes: "Allows you to combine two base attacks to create a new, more powerful attack using an interactive select menu system.",
        features: [
            "Attack combination system",
            "Rare combinations create unique attacks",
            "Select menu interface",
            "Upgrade path tracking",
            "Cost display before confirmation"
        ],
        requirements: {
            nullite: "Base damage × 0.8 + variance",
            fusionCore: "Required for 60+ DMG techniques"
        }
    }
}, {
    name: "createguild",
    category: "Guild",
    description: "Create your own guild.",
    usage: ".createguild <guild_name>",
    aliases: ["cguild", "guildcreate"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".createguild OmnicordLegends - Create a guild named OmnicordLegends",
        ".createguild AlienHunters - Create a guild named AlienHunters"
    ],
    tips: [
        "Requires 1 guild token to create (handled by admin team)",
        "Choose a unique and memorable name",
        "Guilds can have up to 50 members"
    ],
    detailedInfo: {
        whatItDoes: "Creates a new guild with the specified name. Guilds allow players to team up, raid others, and earn exclusive rewards.",
        features: [
            "Custom guild name",
            "Member management",
            "Guild raids",
            "Guild shop",
            "Leaderboard rankings"
        ],
        requirements: "Requires 1 guild token. Guild tokens are handled manually by the admin team."
    }
}, {
    name: "detail",
    category: "User",
    description: "Get detailed information about a specific alien. Shows stats, abilities, and fragment requirements.",
    usage: ".detail <alien_name>",
    aliases: ["d"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".detail heatblast - View Heatblast details",
        ".detail fourarms - View Four Arms details"
    ],
    tips: [
        "Shows required fragments at the bottom",
        "Use this to plan which alien to collect next",
        "View evolution paths if available"
    ],
    detailedInfo: {
        whatItDoes: "Shows comprehensive information about any alien including stats, abilities, evolution paths, and fragment requirements.",
        information: [
            "Base stats (Attack, Defense, Speed)",
            "Abilities and moves",
            "Rarity and evolution stages",
            "Fragment requirements for unlocking",
            "Battle performance tips",
            "Optimal move sets"
        ]
    }
}, {
    name: "donate",
    category: "Support",
    description: "Support Omnicord with your contribution.",
    usage: ".donate",
    aliases: ["support", "fund", "contribute"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [".donate - Get donation information"],
    tips: [
        "Every donation helps the bot grow",
        "Donors get exclusive roles and perks",
        "Support the development team"
    ],
    detailedInfo: {
        whatItDoes: "Provides information on how to support the Omnicord project through donations.",
        features: [
            "Donation link",
            "Exclusive donor roles",
            "Special perks for supporters",
            "Development updates for donors"
        ]
    }
}, {
    name: "event",
    category: "Game",
    description: "Participate in seasonal events (Halloween, etc.).",
    usage: ".event",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [".event - View current event status"],
    tips: [
        "Events have limited time",
        "Better rewards than regular gameplay",
        "Event-exclusive aliens available",
        "Seasonal events rotate throughout the year"
    ],
    detailedInfo: {
        whatItDoes: "Participate in special limited-time seasonal events including Halloween events, Fallen City Expedition, and more.",
        features: [
            "Limited-time events",
            "Exclusive aliens",
            "Special rewards",
            "Event leaderboard"
        ]
    }
}, {
    name: "favorite",
    category: "User",
    description: "Mark or unmark an alien as favorite.",
    usage: ".favorite <alien_id>",
    aliases: ["fav"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".favorite 5 - Mark alien ID 5 as favorite",
        ".favorite 5 - Unmark if already favorited"
    ],
    tips: [
        "Favorites appear at the top of lists",
        "Use filters to show only favorites",
        "Quick access to your best aliens"
    ],
    detailedInfo: {
        whatItDoes: "Toggle favorite status for an alien. Favorites are highlighted and appear first in lists.",
        features: [
            "Quick access to important aliens",
            "Visual star indicator",
            "Filter by favorites",
            "Sort favorites to top"
        ]
    }
}, {
    name: "fragments",
    category: "Game",
    description: "View your alien fragments with every filter imaginable.",
    usage: ".fragments [name:X] [rarity:X] [progress:X] [count:X] [needed:X] [completed:true/false] [sort:X]",
    aliases: ["frags", "myfrags", "fragment", "frag"],
    cooldown: 5,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".frags - View all your fragments",
        ".frags name:heatblast - Check fragments for Heatblast",
        ".frags completed:true - Show only completed aliens",
        ".frags rarity:mythic - Show only mythic fragments",
        ".frags fetch heatblast - Retrieve completed alien info",
        ".frags fetch all - Retrieve all completed aliens"
    ],
    tips: [
        "See how close you are to unlocking new aliens",
        "Rare aliens typically need more fragments",
        "Use filters to find specific fragments quickly"
    ],
    detailedInfo: {
        whatItDoes: "Displays all the alien fragments you've collected with advanced filtering and sorting options.",
        filters: [
            { name: "name:X", description: "Filter by alien name" },
            { name: "rarity:X", description: "Filter by rarity (common, rare, epic, mythical, legendary)" },
            { name: "progress:X", description: "Filter by progress percentage" },
            { name: "count:X", description: "Filter by fragment count" },
            { name: "needed:X", description: "Filter by fragments still needed" },
            { name: "completed:true/false", description: "Show only completed or incomplete aliens" },
            { name: "sort:X", description: "Sort by name, rarity, progress, or count" }
        ],
        subcommands: [
            { name: "fetch <alien>", description: "Retrieve information about a completed alien" },
            { name: "fetch all", description: "Retrieve all completed aliens" }
        ]
    }
}, {
    name: "friend",
    category: "User",
    description: "Manage your friends system including adding, blocking, and privacy settings.",
    usage: ".friend [add/requests/list/privacy/profile/block/unblock] [user]",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".friend add @user - Send a friend request",
        ".friend list - View your friend list",
        ".friend block @user - Block a user",
        ".friend privacy - Manage privacy settings"
    ],
    tips: [
        "Friends get notifications when you're online",
        "Blocked users cannot interact with you",
        "Manage privacy to control visibility"
    ],
    detailedInfo: {
        whatItDoes: "Complete friend system allowing you to add friends, block users, manage privacy settings, and more.",
        subcommands: [
            { name: "add", description: "Send a friend request to another user" },
            { name: "requests", description: "View pending friend requests" },
            { name: "list", description: "View your current friend list" },
            { name: "privacy", description: "Manage your privacy settings" },
            { name: "block", description: "Block a user" },
            { name: "unblock", description: "Unblock a user" }
        ]
    }
}, {
    name: "guildedit",
    category: "Guild",
    description: "Guild Management Panel to manage your guild settings and members.",
    usage: ".guildedit",
    aliases: ["editguild", "guildpanel"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".guildedit - Open the guild management panel"
    ],
    tips: [
        "Fully interactive select menu interface",
        "Manage members and roles",
        "Customize guild settings",
        "Will move to web interface in the future"
    ],
    detailedInfo: {
        whatItDoes: "A comprehensive management panel for guild leaders to manage their guild using select menus and buttons.",
        features: [
            "Member management via select menus",
            "Role assignment",
            "Guild settings",
            "Request management",
            "Will move to web interface for better UI"
        ]
    }
}, {
    name: "guildinfo",
    category: "Guild",
    description: "Show all details of a guild by ID with aesthetic UI and member pagination.",
    usage: ".guildinfo <guild_id>",
    aliases: ["ginfo", "guilddetails", "guild"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".guildinfo 12345 - View guild details",
        ".guildinfo - View your current guild details"
    ],
    tips: [
        "See guild member list with pagination",
        "View guild statistics and rankings",
        "Check guild shop availability"
    ],
    detailedInfo: {
        whatItDoes: "Displays detailed information about a guild including members, stats, and rankings.",
        information: [
            "Guild name and ID",
            "Member count and list (pagination)",
            "Guild level",
            "Guild currency",
            "Current raids",
            "Guild shop status"
        ]
    }
}, {
    name: "guildlist",
    category: "Guild",
    description: "View the list of available guilds with pagination and detailed info.",
    usage: ".guildlist",
    aliases: ["guilds", "listguilds"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".guildlist - View all guilds with pagination",
        ".guildlist 2 - View page 2 of guilds"
    ],
    tips: [
        "See which guilds are accepting members",
        "View guild stats before joining",
        "Find the perfect guild for you",
        "Results are paginated for easy browsing"
    ],
    detailedInfo: {
        whatItDoes: "Shows a paginated list of all available guilds with their stats.",
        features: [
            "Pagination support",
            "Guild statistics display",
            "Member count",
            "Accepting members indicator",
            "Ranking information"
        ]
    }
}, {
    name: "guildShop",
    category: "Guild",
    description: "Open the Guild Shop to purchase exclusive guild items.",
    usage: ".guildShop",
    aliases: ["gs", "guildbuy", "guildshop"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".guildShop - Open the guild shop"
    ],
    tips: [
        "Completely select menu and button interface",
        "Items require guild currency",
        "Will move to web interface in the future"
    ],
    detailedInfo: {
        whatItDoes: "Opens the guild shop where members can purchase exclusive items using guild currency. All interactions are done via select menus and buttons.",
        items: [
            "Guild boosters",
            "Exclusive cosmetics",
            "Special items",
            "Guild perks"
        ],
        features: [
            "Weekly rotation",
            "Exclusive to guild members",
            "Better prices than regular shop",
            "Will move to web interface for better UI"
        ]
    }
}, {
    name: "help",
    category: "General",
    description: "Display help information for all commands or a specific command.",
    usage: ".help [command]",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".help - Show all commands",
        ".help battle - Show detailed help for battle command"
    ],
    tips: [
        "Use .help [command] for specific command info",
        "Commands are grouped by category",
        "New commands are added regularly"
    ],
    detailedInfo: {
        whatItDoes: "The help command displays all available commands or detailed information about a specific command. Commands are organized by category for easy browsing.",
        sections: [
            { name: "All Commands", description: "Shows a paginated list of all available commands with categories" },
            { name: "Command Details", description: "Provides detailed information about a specific command including usage, examples, and tips" }
        ],
        features: [
            "Paginated command list",
            "Category filtering",
            "Detailed command information",
            "Search functionality"
        ]
    }
}, {
    name: "incense",
    category: "Shop",
    description: "Manage incense to boost alien spawns in multiple channels (max 5).",
    usage: ".incense [buy | list | pause | resume | stop | pauseall | resumeall | stopall] [channel]",
    aliases: ["incense"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".incense buy - Activate incense (costs 120 Nullite)",
        ".incense list - Show active incense",
        ".incense pause #general - Pause incense in #general",
        ".incense resume #general - Resume incense in #general",
        ".incense stop #general - Stop incense in #general",
        ".incense pauseall - Pause all incense (Admin only)",
        ".incense resumeall - Resume all incense (Admin only)",
        ".incense stopall - Stop all incense (Admin only)"
    ],
    tips: [
        "Maximum 5 active incense at once",
        "Incense costs 120 Nullite to activate",
        "Each incense boosts spawns in one channel",
        "Admins can manage all incense"
    ],
    detailedInfo: {
        whatItDoes: "The incense system allows you to boost alien spawn rates in specific channels. Perfect for hunting rare aliens!",
        cost: "120 Nullite per incense activation",
        limits: "Maximum 5 active incense at once",
        subcommands: [
            { name: "buy", description: "Activate incense in the current channel (costs 120 Nullite)" },
            { name: "list", description: "Show all active incense with their channels and remaining time" },
            { name: "pause [channel]", description: "Pause incense in a specific channel" },
            { name: "resume [channel]", description: "Resume paused incense in a specific channel" },
            { name: "stop [channel]", description: "Stop incense in a specific channel" },
            { name: "pauseall", description: "Pause all active incense (Admin only)" },
            { name: "resumeall", description: "Resume all paused incense (Admin only)" },
            { name: "stopall", description: "Stop all incense (Admin only)" }
        ]
    }
}, {
    name: "info",
    category: "User",
    description: "View detailed information about your aliens.",
    usage: ".info [id]",
    aliases: ["i"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".info - View your active alien info",
        ".info 5 - View info for alien ID 5"
    ],
    tips: [
        "Shows detailed stats and abilities",
        "View experience and level progress",
        "Check equipped items and passives"
    ],
    detailedInfo: {
        whatItDoes: "Displays comprehensive information about your specified alien including stats, abilities, experience, and more.",
        information: [
            "Alien name and ID",
            "Current level and experience",
            "Base stats (ATK, DEF, SPD)",
            "DNA quality",
            "Abilities and moves",
            "Equipped items",
            "Passive abilities",
            "Battle performance"
        ]
    }
}, {
    name: "inventory",
    category: "Economy",
    description: "View your collected items with pagination.",
    usage: ".inventory [page]",
    aliases: ["inv", "bag", "items"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".inventory - View your inventory",
        ".inventory 2 - View page 2 of your inventory"
    ],
    tips: [
        "Items include potions, boosts, and cosmetics",
        "Rare items have better effects",
        "Sell unwanted items for Tyden"
    ],
    detailedInfo: {
        whatItDoes: "Displays all items in your inventory with pagination support.",
        itemTypes: [
            "Potions and boosts",
            "Cosmetic items",
            "Battle items",
            "Eggs",
            "Special items"
        ],
        features: [
            "Pagination for large inventories",
            "Item rarity display",
            "Quantity tracking",
            "Item usage options"
        ]
    }
}, {
    name: "invite",
    category: "Info",
    description: "Sends the bot invite link, support server, and website link with an embed, buttons, and select menu.",
    usage: ".invite",
    aliases: ["invitebot", "inviteme"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [".invite - Get bot invite links"],
    tips: [
        "Share the bot with your friends",
        "Join the support server for help",
        "Visit the website for updates"
    ],
    detailedInfo: {
        whatItDoes: "Provides links to invite the bot to your server, join the support server, and visit the website.",
        features: [
            "Bot invite link",
            "Support server link",
            "Website link",
            "Interactive buttons",
            "Select menu for options"
        ]
    }
}, {
    name: "join",
    category: "Guild",
    description: "Join an existing guild by guild ID.",
    usage: ".join <guild_id>",
    aliases: ["joinguild"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".join 12345 - Join guild with ID 12345",
        ".join - View guild join requests"
    ],
    tips: [
        "You can only be in one guild at a time",
        "Some guilds require approval",
        "Leave your current guild first using .leaveguild"
    ],
    detailedInfo: {
        whatItDoes: "Allows you to join an existing guild by providing the guild ID.",
        features: [
            "Auto-join if guild is open",
            "Request system for private guilds",
            "Guild member limit checking"
        ]
    }
}, {
    name: "leaderboard",
    category: "Guild",
    description: "View the leaderboard.",
    usage: ".leaderboard",
    aliases: ["gleaderboard", "glead", "guildlb", "guildleaderboard", "lead", "lb"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".leaderboard - View global leaderboard",
        ".leaderboard battle - View battle leaderboard",
        ".leaderboard tyden - View Tyden leaderboard",
        ".leaderboard guild - View guild leaderboard"
    ],
    tips: [
        "Compete for top positions",
        "Top players get exclusive rewards",
        "Leaderboards reset seasonally"
    ],
    detailedInfo: {
        whatItDoes: "Displays various leaderboards including battle, Tyden, and guild rankings.",
        types: [
            { name: "Battle", description: "Battle win/loss rankings" },
            { name: "Tyden", description: "Tyden wealth rankings" },
            { name: "Guild", description: "Guild rankings" }
        ],
        features: [
            "Pagination support",
            "Rank emojis",
            "Stats display",
            "Seasonal resets"
        ]
    }
}, {
    name: "leaveguild",
    category: "Guild",
    description: "Leave your current guild.",
    usage: ".leaveguild",
    aliases: ["leave"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".leaveguild - Leave your current guild",
        ".leaveguild confirm - Confirm leaving"
    ],
    tips: [
        "You cannot rejoin for 24 hours",
        "Guild progress is lost",
        "Consider your decision carefully"
    ],
    detailedInfo: {
        whatItDoes: "Allows you to leave your current guild. You will need to wait 24 hours before joining another guild.",
        features: [
            "Cooldown period of 24 hours",
            "Guild stat reset",
            "Confirmation requirement"
        ]
    }
}, {
    name: "leveldm",
    category: "Settings",
    description: "Set your personal level-up DM preference.",
    usage: ".leveldm <on|off|auto>",
    aliases: ["leveldm", "levelpref", "lvlpref"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".leveldm on - Always receive level-up DMs",
        ".leveldm off - Never receive level-up DMs",
        ".leveldm auto - Follow server setting (default)"
    ],
    tips: [
        "Auto follows server settings",
        "Change at any time",
        "DMs include reward information"
    ],
    detailedInfo: {
        whatItDoes: "Sets your personal preference for receiving level-up direct messages.",
        options: [
            { name: "on", description: "Always receive level-up DMs" },
            { name: "off", description: "Never receive level-up DMs" },
            { name: "auto", description: "Follow the server setting (default)" }
        ]
    }
}, {
    name: "luckspin",
    category: "Fun",
    description: "Spin the wheel for seasonal Ben 10 aliens, fragments, and rewards.",
    usage: ".luckspin",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [".luckspin - Spin the wheel"],
    tips: [
        "One free spin per day",
        "Win complete aliens or fragments",
        "Seasonal rewards change regularly",
        "Buy more spins at https://shop.omnicord.site"
    ],
    detailedInfo: {
        whatItDoes: "The Luck Spin is a gacha-style feature that gives you a random reward. Spin the wheel once per day for free!",
        rewards: [
            "Complete alien unlocks",
            "Alien fragments",
            "Tyden currency",
            "Special items",
            "Seasonal exclusive aliens",
            "Nullite"
        ],
        features: [
            "Daily free spin (once per day)",
            "Additional spins can be purchased at https://shop.omnicord.site",
            "Seasonal reward rotations",
            "Rarity-based reward system"
        ]
    }
}, {
    name: "market",
    category: "Economy",
    description: "Market to sell and buy aliens.",
    usage: ".market <add|remove|info|buy|list> [args]",
    aliases: ["m"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".market add 5 10000 - List alien ID 5 for 10000 Tyden",
        ".market remove 123 - Remove listing #123",
        ".market info 123 - View listing #123 details",
        ".market buy 123 - Buy listing #123",
        ".market list - View all listings with filters",
        ".market list -mine - View your listings"
    ],
    tips: [
        "Price items competitively",
        "Rare aliens sell for more",
        "Check market trends before listing"
    ],
    detailedInfo: {
        whatItDoes: "A marketplace where players can buy and sell aliens directly.",
        subcommands: [
            { name: "add", description: "List your alien for sale" },
            { name: "remove", description: "Remove your listing" },
            { name: "info", description: "View listing details" },
            { name: "buy", description: "Purchase a listed alien" },
            { name: "list", description: "View all listings with filters" },
            { name: "list -mine", description: "View only your listings" }
        ],
        filters: [
            { name: "name:X", description: "Filter by alien name" },
            { name: "rarity:X", description: "Filter by rarity" },
            { name: "min:X", description: "Minimum price filter" },
            { name: "max:X", description: "Maximum price filter" }
        ],
        features: [
            "Direct buying and selling",
            "No bidding wars",
            "Price your items freely",
            "Filter and search options"
        ]
    }
}, {
    name: "moves",
    category: "Game",
    description: "Manage your alien combat abilities and movesets.",
    usage: ".moves [list|info|explain] [args]",
    aliases: ["attacks", "combos"],
    cooldown: 5,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".moves - Open the moves management interface",
        ".moves list - Show moves of your current alien",
        ".moves list heatblast - Show moves of Heatblast",
        ".moves info fireball - Information about fireball move",
        ".moves explain burn - Explanation of burn effect"
    ],
    tips: [
        "Different moves have different effects",
        "Some moves are type-specific",
        "Learn moves from battles and items"
    ],
    detailedInfo: {
        whatItDoes: "Allows you to view and manage your alien's combat abilities and movesets using interactive select menus.",
        features: [
            "3 select menus: Attacks, Special Attacks (combined), and Passives",
            "Move assignment via select menus",
            "Move learning"
        ],
        subcommands: [
            { name: "list [alien]", description: "Lists the moves of the specified alien or current alien if none provided" },
            { name: "info <move name>", description: "Shows detailed information about a specific move" },
            { name: "explain <effect>", description: "Explains how a specific effect works in detail" }
        ]
    }
}, {
    name: "open",
    category: "Game",
    description: "Open boxes to earn rewards. Different box types contain different rewards.",
    usage: ".open [box_type] [amount]",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".open common - Open a Common box",
        ".open rare 3 - Open 3 Rare boxes",
        ".open epic - Open an Epic box",
        ".open legendary - Open a Legendary box",
        ".open all - Open 10 of all boxes (max 10)"
    ],
    tips: [
        "Boxes contain aliens, fragments, and more",
        "Different box types have different reward pools",
        "Maximum 10 boxes can be opened at once",
        "Box rarities: Common, Rare, Epic, Legendary"
    ],
    detailedInfo: {
        whatItDoes: "Opens boxes to reveal their contents. Each box type offers different rewards with varying rarities.",
        boxTypes: [
            { name: "Common", description: "Basic box with common rewards" },
            { name: "Rare", description: "Contains higher rarity rewards" },
            { name: "Epic", description: "Contains epic rarity rewards" },
            { name: "Legendary", description: "Best chance at legendary aliens and items" }
        ],
        features: [
            "Open up to 10 boxes at once",
            "Open 10 of all boxes with .open all",
            "Box rarity system",
            "Guaranteed rewards"
        ]
    }
}, {
    name: "ping",
    category: "Info",
    description: "Check the bot's latency and response time.",
    usage: ".ping",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [".ping - Check bot latency"],
    tips: [
        "Shows ping in milliseconds",
        "Lower is better",
        "Use to check if bot is responding"
    ],
    detailedInfo: {
        whatItDoes: "Displays the bot's current latency (ping) in milliseconds.",
        features: [
            "WebSocket latency",
            "API latency",
            "Database latency"
        ]
    }
}, {
    name: "profile",
    category: "User",
    description: "Display your profile.",
    usage: ".profile",
    aliases: ["prof", "pf"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".profile - View your profile"
    ],
    tips: [
        "Customize with season backgrounds",
        "View your statistics",
        "You can only view your own profile"
    ],
    detailedInfo: {
        whatItDoes: "Displays your profile with statistics and customization options.",
        features: [
            "Profile statistics",
            "Season backgrounds",
            "Alien showcase",
            "Achievement display"
        ]
    }
}, {
    name: "raid",
    category: "Guild",
    description: "Raid another guild to steal their Proto-Bits.",
    usage: ".raid <guild_id>",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".raid 12345 - Raid guild ID 12345",
        ".raid - View raid status"
    ],
    tips: [
        "Only guild members with Raider role can raid",
        "Contact guild owner to become a Raider",
        "Raid successful if your guild is stronger",
        "Steal Proto-Bits from other guilds"
    ],
    detailedInfo: {
        whatItDoes: "Allows your guild's Raiders to raid another guild and steal their Proto-Bits.",
        features: [
            "Guild strength comparison",
            "Proto-Bit stealing",
            "Raid cooldown",
            "Defense mechanics"
        ],
        requirements: "You must have the Raider role in your guild to use this command. Contact your guild owner to become a Raider."
    }
}, {
    name: "redeem",
    category: "Game",
    description: "Redeem a code to claim rewards.",
    usage: ".redeem <code>",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".redeem SUMMER2024 - Redeem a code",
        ".redeem - View available codes"
    ],
    tips: [
        "Codes are case-sensitive",
        "Each code can only be used once",
        "Some codes expire"
    ],
    detailedInfo: {
        whatItDoes: "Allows you to redeem special codes for rewards including aliens, fragments, currency, and items.",
        features: [
            "One-time use codes",
            "Time-limited codes",
            "Event-specific codes",
            "Reward display"
        ]
    }
}, {
    name: "redirect",
    category: "Settings",
    description: "Add/remove redirect channels for villain spawns or level-ups.",
    usage: ".redirect <level|lvl|spawn|spwn> [#channel or dm or off] [#channel2 ...]",
    aliases: ["redirect"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".redirect level #general - Redirect level-ups to #general",
        ".redirect spawn #events - Redirect villain spawns to #events",
        ".redirect level off - Disable level-up redirects"
    ],
    tips: [
        "Level redirects send level-up messages",
        "Spawn redirects send villain spawn notifications",
        "Multiple channels can be set (upto the limit)",
        "Use .leveldm to turn DM notifications off"
    ],
    detailedInfo: {
        whatItDoes: "Configures redirect channels for level-up notifications and villain spawns.",
        types: [
            { name: "level/lvl", description: "Redirect level-up notifications" },
            { name: "spawn/spwn", description: "Redirect villain spawn notifications" }
        ],
        options: [
            { name: "#channel", description: "Send notifications to specific channel" },
            { name: "dm", description: "Send notifications via DM" },
            { name: "off", description: "Disable redirects" }
        ],
        limits: "Maximum channels can be set based on server settings. Use .leveldm to turn DM notifications off."
    }
}, {
    name: "register",
    category: "Utility",
    description: "Register yourself in the Omnicord database to start using commands!",
    usage: ".register",
    aliases: ["reg", "signup", "join", "start"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [".register - Create your account"],
    tips: [
        "Must be done before using most commands",
        "You only need to register once",
        "Registration is free"
    ],
    detailedInfo: {
        whatItDoes: "Creates your player profile in the Omnicord database. This is the first step to start your adventure.",
        requirements: "No special requirements. Just type the command in any channel where the bot can see your message.",
        benefits: [
            "Access to all game features",
            "Ability to collect aliens",
            "Participate in battles",
            "Earn currency and rewards"
        ]
    }
}, {
    name: "reindex",
    category: "User",
    description: "Reindex your alien IDs to be sequential.",
    usage: ".reindex [confirm]",
    aliases: ["ri"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".reindex - Preview reindex",
        ".reindex confirm - Confirm reindex"
    ],
    tips: [
        "Makes alien IDs start from 1",
        "Useful for organization",
        "Cannot be undone"
    ],
    detailedInfo: {
        whatItDoes: "Reorganizes your alien IDs to be sequential, starting from 1.",
        features: [
            "Preview before confirming",
            "One-time operation",
            "Cannot be undone",
            "Preserves alien data"
        ]
    }
}, {
    name: "setbio",
    category: "User",
    description: "Set or update your profile bio.",
    usage: ".setbio <text>",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".setbio I love collecting aliens! - Set your bio",
        ".setbio - Clear your bio"
    ],
    tips: [
        "Maximum 200 characters",
        "Can contain emojis",
        "No harmful or abusive language allowed",
        "Default: 'I love Omnicord!'"
    ],
    detailedInfo: {
        whatItDoes: "Allows you to set or update your profile bio.",
        features: [
            "Text customization",
            "Emoji support",
            "Character limit: 200",
            "Displayed on profile"
        ],
        restrictions: [
            "No harmful or abusive language",
            "Default bio is 'I love Omnicord!'"
        ]
    }
}, {
    name: "setnickname",
    category: "User",
    description: "Set a nickname for your alien.",
    usage: ".setnickname <alien_id> <nickname>",
    aliases: ["nick", "setnick", "nickname"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".setnickname 5 Flare - Name alien ID 5 'Flare'",
        ".setnickname 5 - Remove nickname from alien ID 5"
    ],
    tips: [
        "Nicknames make aliens easier to identify",
        "Max 30 characters",
        "Useful for organizing your collection"
    ],
    detailedInfo: {
        whatItDoes: "Sets a custom nickname for your alien.",
        features: [
            "Custom naming",
            "Max 30 characters",
            "Remove nickname option",
            "Shows in lists"
        ]
    }
}, {
    name: "shop",
    category: "Shop",
    description: "Buy season backgrounds, battle backgrounds, potions, and passives.",
    usage: ".shop",
    aliases: ["seasonshop", "buyseason"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".shop - Open the shop"
    ],
    tips: [
        "Select menu interface for easy browsing",
        "Two shops available: Battle Backgrounds & Items",
        "Items include potions and passives",
        "Premium items available for Nullite"
    ],
    detailedInfo: {
        whatItDoes: "Opens the shop where you can buy and equip season backgrounds, battle backgrounds, potions, and passive abilities using select menus and buttons.",
        shopTypes: [
            { name: "Battle Backgrounds", description: "Cosmetic backgrounds for battles" },
            { name: "Items & Passives", description: "Potions, boost items, and passive abilities" }
        ],
        features: [
            "Seasonal rotation",
            "Tyden and Nullite purchases",
            "Select menu interface",
            "Button interactions",
            "Preview before buying"
        ]
    }
}, {
    name: "trade",
    category: "Economy",
    description: "Trade Tyden, Nullite, aliens, and fragments with another user.",
    usage: ".trade <@user> or .trade <add/confirm/cancel>",
    aliases: ["t"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".trade @user - Start a trade with someone",
        ".trade add alien 5 - Add alien ID 5 to the trade",
        ".trade add fragment heatblast 10 - Add 10 Heatblast fragments",
        ".trade add tyden 1000 - Add 1000 Tyden to trade",
        ".trade add nullite 50 - Add 50 Nullite to trade",
        ".trade confirm - Confirm the trade",
        ".trade cancel - Cancel the trade"
    ],
    tips: [
        "Both players must confirm",
        "Trades are final once confirmed",
        "Trades require mutual agreement"
    ],
    detailedInfo: {
        whatItDoes: "A comprehensive trading system allowing players to exchange Tyden, Nullite, aliens, and fragments.",
        subcommands: [
            { name: "@user", description: "Start a trade with another user" },
            { name: "add alien [id]", description: "Add an alien to the trade" },
            { name: "add fragment [name] [amount]", description: "Add fragments to the trade (amount required)" },
            { name: "add tyden [amount]", description: "Add Tyden to the trade" },
            { name: "add nullite [amount]", description: "Add Nullite to the trade" },
            { name: "confirm", description: "Confirm and finalize the trade" },
            { name: "cancel", description: "Cancel the current trade" }
        ],
        features: [
            "Multi-item trades",
            "Real-time updates",
            "Both must confirm",
            "Trade history tracking"
        ]
    }
}, {
    name: "transform",
    category: "User",
    description: "Transform into one of your aliens.",
    usage: ".transform [alien_id]",
    aliases: ["select", "s", "tf"],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [
        ".transform 5 - Transform into alien ID 5",
        ".transform - View your active alien"
    ],
    tips: [
        "You can only transform into aliens you own",
        "Active alien appears in battle",
        "Each alien has unique abilities"
    ],
    detailedInfo: {
        whatItDoes: "Allows you to select and transform into one of your alien companions.",
        features: [
            "Alien selection",
            "Active alien display",
            "Battle preparation",
            "Quick-switch option"
        ]
    }
}, {
    name: "vote",
    category: "Game",
    description: "Check voting status and claim rewards for voting for the bot.",
    usage: ".vote",
    aliases: [],
    cooldown: null,
    guildOnly: false,
    ownerOnly: false,
    examples: [".vote - Check vote status"],
    tips: [
        "Vote daily for consistent rewards",
        "Each vote helps the bot grow",
        "Vote streaks give bonus rewards"
    ],
    detailedInfo: {
        whatItDoes: "Shows your current voting status and allows you to claim rewards for voting. Voting helps the bot get discovered by more users.",
        rewards: [
            "Vote boxes containing anything (Nullite, Tyden, or fragments)",
            "Tyden bonuses",
            "Special vote-exclusive items",
            "Experience boosts"
        ],
        features: [
            "Daily voting reminder",
            "Vote streak tracking",
            "Bonus rewards for streaks"
        ]
    }
}];

const categories = [...new Set(commandData.map(cmd => cmd.category))].sort();

document.getElementById('cmdCount').textContent = commandData.length;
document.getElementById('genDate').textContent = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied: ' + text, 'success');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showToast('Copied: ' + text, 'success');
    } catch (err) {
        showToast('Failed to copy', 'error');
    }
    document.body.removeChild(textarea);
}

function showToast(message, type) {
    type = type || 'success';
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toast.className = 'toast ' + type;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function() {
        toast.classList.remove('show');
    }, 2000);
}

function buildCategoryNav() {
    const container = document.getElementById('categoryNav');
    var html = '';
    var icons = {
        'Combat': 'fa-crosshairs',
        'Game': 'fa-gamepad',
        'User': 'fa-user',
        'Economy': 'fa-coins',
        'Guild': 'fa-crown',
        'General': 'fa-list',
        'Shop': 'fa-store',
        'Info': 'fa-info-circle',
        'Settings': 'fa-sliders-h',
        'Utility': 'fa-tools',
        'Fun': 'fa-dice',
        'Support': 'fa-heart'
    };
    categories.forEach(function(category) {
        var count = commandData.filter(function(c) { return c.category === category; }).length;
        var icon = icons[category] || 'fa-folder';
        html += '<a onclick="showCategoryPage(\'' + category + '\', this, event)"><i class="fas ' + icon + '"></i> ' + category + '<span class="badge">' + count + '</span></a>';
    });
    container.innerHTML = html;
}
buildCategoryNav();

function buildCategoryFilters() {
    var container = document.getElementById('categoryFilters');
    var html = '<button class="filter-btn active" data-category="all" onclick="filterByCategory(\'all\', this, event)">All</button>';
    categories.forEach(function(category) {
        html += '<button class="filter-btn" data-category="' + category + '" onclick="filterByCategory(\'' + category + '\', this, event)">' + category + '</button>';
    });
    container.innerHTML = html;
}
buildCategoryFilters();

function renderCommands(commands, containerId) {
    containerId = containerId || 'commandsList';
    var container = document.getElementById(containerId);
    if (!container) return;

    if (commands.length === 0) {
        container.innerHTML = '<div class="no-results"><p>No commands found</p></div>';
        return;
    }

    var html = '';
    commands.forEach(function(cmd, index) {
        var aliases = cmd.aliases && cmd.aliases.length > 0 ? cmd.aliases.map(function(a) { return '<span>' + a + '</span>'; }).join('') : '';

        var bodyHtml = '<div class="cmd-description">' + cmd.description + '</div>';

        if (cmd.detailedInfo) {
            bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">What it does</div><div style="color:var(--text-secondary);line-height:1.7;">' + cmd.detailedInfo.whatItDoes + '</div></div>';

            if (cmd.detailedInfo.filters && cmd.detailedInfo.filters.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Available Filters</div><table class="filter-table"><thead><tr><th>Category</th><th>Filter</th><th>Description</th></tr></thead><tbody>';
                cmd.detailedInfo.filters.forEach(function(f) {
                    bodyHtml += '<tr><td>' + f.name + '</td><td><code>' + f.filter + '</code></td><td>' + f.description + '</td></tr>';
                });
                bodyHtml += '</tbody></table></div>';
            }

            if (cmd.detailedInfo.modes && cmd.detailedInfo.modes.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Battle Modes</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.modes.forEach(function(m) {
                    bodyHtml += '<li><strong>' + m.name + '</strong>: ' + m.description + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.currency) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Currency Types</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;"><li><strong><span class="text-success">Tyden</span></strong>: ' + cmd.detailedInfo.currency.tyden + '</li><li><strong><span class="text-warning">Nullite</span></strong>: ' + cmd.detailedInfo.currency.nullite + '</li></ul></div>';
            }

            if (cmd.detailedInfo.boxTypes && cmd.detailedInfo.boxTypes.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Box Types</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.boxTypes.forEach(function(b) {
                    bodyHtml += '<li><strong>' + b.name + '</strong>: ' + b.description + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.rewards && Array.isArray(cmd.detailedInfo.rewards) && cmd.detailedInfo.rewards.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Rewards</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.rewards.forEach(function(r) {
                    bodyHtml += '<li>' + r + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.ranks && cmd.detailedInfo.ranks.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Battle Ranks</div><div class="rank-list">';
                cmd.detailedInfo.ranks.forEach(function(rank) {
                    var emojiUrl = 'https://cdn.discordapp.com/emojis/' + rank.emoji + '.png?size=64';
                    bodyHtml += '<div class="rank-item"><img src="' + emojiUrl + '" alt="' + rank.name + '" class="rank-emoji"><span class="rank-name">' + rank.name + '</span><span class="rank-rating">' + rank.rating + '</span></div>';
                });
                bodyHtml += '</div></div>';
            }

            if (cmd.detailedInfo.subcommands && cmd.detailedInfo.subcommands.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Subcommands</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.subcommands.forEach(function(sc) {
                    bodyHtml += '<li><strong>' + sc.name + '</strong>: ' + sc.description + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.features && Array.isArray(cmd.detailedInfo.features) && cmd.detailedInfo.features.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Features</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.features.forEach(function(f) {
                    bodyHtml += '<li>' + f + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.requirements) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Requirements</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                if (typeof cmd.detailedInfo.requirements === 'string') {
                    bodyHtml += '<li>' + cmd.detailedInfo.requirements + '</li>';
                } else {
                    Object.entries(cmd.detailedInfo.requirements).forEach(function(entry) {
                        bodyHtml += '<li><strong>' + entry[0] + '</strong>: ' + entry[1] + '</li>';
                    });
                }
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.restrictions && Array.isArray(cmd.detailedInfo.restrictions) && cmd.detailedInfo.restrictions.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Restrictions</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.restrictions.forEach(function(r) {
                    bodyHtml += '<li><span class="text-danger">⛔</span> ' + r + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.information && cmd.detailedInfo.information.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Information</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.information.forEach(function(info) {
                    bodyHtml += '<li><span class="text-success">✓</span> ' + info + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.options && cmd.detailedInfo.options.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Options</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.options.forEach(function(opt) {
                    bodyHtml += '<li><strong>' + opt.name + '</strong>: ' + opt.description + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.rankers) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Rankers</div><p style="color:var(--text-secondary);line-height:1.7;"><span class="text-warning">👑</span> ' + cmd.detailedInfo.rankers + '</p></div>';
            }

            if (cmd.detailedInfo.games && cmd.detailedInfo.games.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Games</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.games.forEach(function(g) {
                    bodyHtml += '<li>' + g + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.rules) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Rules</div><p style="color:var(--text-secondary);line-height:1.7;">' + cmd.detailedInfo.rules + '</p></div>';
            }

            if (cmd.detailedInfo.sections && cmd.detailedInfo.sections.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Sections</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.sections.forEach(function(s) {
                    bodyHtml += '<li><strong>' + s.name + '</strong>: ' + s.description + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.itemTypes && cmd.detailedInfo.itemTypes.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Item Types</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.itemTypes.forEach(function(it) {
                    bodyHtml += '<li>' + it + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.types && cmd.detailedInfo.types.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Types</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.types.forEach(function(t) {
                    bodyHtml += '<li><strong>' + t.name + '</strong>: ' + t.description + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.benefits && cmd.detailedInfo.benefits.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Benefits</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.benefits.forEach(function(b) {
                    bodyHtml += '<li><span class="text-success">✓</span> ' + b + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.limits) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Limits</div><p style="color:var(--text-secondary);line-height:1.7;">' + cmd.detailedInfo.limits + '</p></div>';
            }

            if (cmd.detailedInfo.cost) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Cost</div><p style="color:var(--text-secondary);line-height:1.7;">' + cmd.detailedInfo.cost + '</p></div>';
            }

            if (cmd.detailedInfo.items && cmd.detailedInfo.items.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Items</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.items.forEach(function(item) {
                    bodyHtml += '<li>' + item + '</li>';
                });
                bodyHtml += '</ul></div>';
            }

            if (cmd.detailedInfo.shopTypes && cmd.detailedInfo.shopTypes.length > 0) {
                bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Shop Types</div><ul style="color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;">';
                cmd.detailedInfo.shopTypes.forEach(function(st) {
                    bodyHtml += '<li><strong>' + st.name + '</strong>: ' + st.description + '</li>';
                });
                bodyHtml += '</ul></div>';
            }
        }

        if (cmd.usage) {
            bodyHtml += '<div class="cmd-usage" onclick="copyToClipboard(\'' + cmd.usage + '\')" style="cursor:pointer;">' + cmd.usage + ' <span style="float:right;font-size:0.7rem;color:var(--text-muted);"><i class="fas fa-copy"></i> Click to copy</span></div>';
        }

        if (cmd.examples && cmd.examples.length > 0) {
            bodyHtml += '<div style="margin:0.5rem 0;"><div style="color:var(--text-primary);font-weight:500;margin-bottom:0.25rem;">Examples</div>';
            cmd.examples.forEach(function(ex) {
                var cmdText = ex.split(' - ')[0];
                bodyHtml += '<div class="cmd-example" onclick="copyToClipboard(\'' + cmdText + '\')" style="cursor:pointer;">' + ex + ' <span style="float:right;font-size:0.6rem;color:var(--text-muted);"><i class="fas fa-copy"></i></span></div>';
            });
            bodyHtml += '</div>';
        }

        if (cmd.tips && cmd.tips.length > 0) {
            bodyHtml += '<div class="cmd-tips"><ul>';
            cmd.tips.forEach(function(t) {
                bodyHtml += '<li><span class="text-success">💡</span> ' + t + '</li>';
            });
            bodyHtml += '</ul></div>';
        }

        bodyHtml += '<div class="cmd-meta">';
        if (cmd.cooldown) bodyHtml += '<span><i class="fas fa-clock"></i> Cooldown: ' + cmd.cooldown + 's</span>';
        if (cmd.guildOnly) bodyHtml += '<span><i class="fas fa-crown" style="color:#ffa502;"></i> Guild Only</span>';
        if (cmd.ownerOnly) bodyHtml += '<span><i class="fas fa-user-shield" style="color:#ff4757;"></i> Owner Only</span>';
        if (cmd.category) bodyHtml += '<span><i class="fas fa-tag"></i> ' + cmd.category + '</span>';
        bodyHtml += '</div>';

        html += '<div class="command-card" id="cmd-' + containerId + '-' + index + '"><div class="command-header" onclick="toggleCommand(\'cmd-' + containerId + '-' + index + '\')"><span class="cmd-name">.' + cmd.name + '</span><span class="cmd-category">' + cmd.category + '</span>';
        if (cmd.aliases && cmd.aliases.length > 0) html += '<div class="cmd-aliases">' + aliases + '</div>';
        html += '<span class="cmd-toggle">▼</span></div><div class="command-body">' + bodyHtml + '</div></div>';
    });

    container.innerHTML = html;
}

function toggleCommand(id) {
    var card = document.getElementById(id);
    if (card) {
        card.classList.toggle('open');
        var body = card.querySelector('.command-body');
        if (card.classList.contains('open')) {
            body.style.maxHeight = '1200px';
            body.style.padding = '0 1.25rem 1.25rem';
        } else {
            body.style.maxHeight = '0';
            body.style.padding = '0 1.25rem';
        }
    }
}

renderCommands(commandData);

function filterCommands() {
    var search = document.getElementById('commandSearch').value.toLowerCase();
    var activeCategory = document.querySelector('.category-filters .filter-btn.active')?.dataset.category || 'all';
    var filtered = commandData.filter(function(cmd) {
        var matchesSearch = cmd.name.toLowerCase().includes(search) || cmd.description.toLowerCase().includes(search) || cmd.category.toLowerCase().includes(search) || (cmd.aliases && cmd.aliases.some(function(a) { return a.toLowerCase().includes(search); }));
        var matchesCategory = activeCategory === 'all' || cmd.category === activeCategory;
        return matchesSearch && matchesCategory;
    });
    renderCommands(filtered);
}

function filterByCategory(category, btn, e) {
    if (e) e.stopPropagation();
    document.querySelectorAll('.category-filters .filter-btn').forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    var search = document.getElementById('commandSearch').value.toLowerCase();
    var filtered = commandData.filter(function(cmd) {
        var matchesSearch = cmd.name.toLowerCase().includes(search) || cmd.description.toLowerCase().includes(search) || cmd.category.toLowerCase().includes(search) || (cmd.aliases && cmd.aliases.some(function(a) { return a.toLowerCase().includes(search); }));
        var matchesCategory = category === 'all' || cmd.category === category;
        return matchesSearch && matchesCategory;
    });
    renderCommands(filtered);
}

function showPage(pageId, element, e) {
    if (e) e.stopPropagation();
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    var target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');
    if (element) {
        document.querySelectorAll('.sidebar-nav a').forEach(function(a) { a.classList.remove('active'); });
        element.classList.add('active');
    }
    if (window.innerWidth <= 768) toggleSidebar(false);
}

function showCategoryPage(category, element, e) {
    if (e) e.stopPropagation();
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    var page = document.getElementById('page-cat-' + category.replace(/\s/g, ''));
    if (!page) {
        page = document.createElement('div');
        page.id = 'page-cat-' + category.replace(/\s/g, '');
        page.className = 'page';
        document.getElementById('categoryPages').appendChild(page);
        var commands = commandData.filter(function(c) { return c.category === category; });
        var icons = {
            'Combat': 'fa-crosshairs',
            'Game': 'fa-gamepad',
            'User': 'fa-user',
            'Economy': 'fa-coins',
            'Guild': 'fa-crown',
            'General': 'fa-list',
            'Shop': 'fa-store',
            'Info': 'fa-info-circle',
            'Settings': 'fa-sliders-h',
            'Utility': 'fa-tools',
            'Fun': 'fa-dice',
            'Support': 'fa-heart'
        };
        var icon = icons[category] || 'fa-folder';
        var html = '<div class="page-header"><h1><i class="fas ' + icon + '" style="color:var(--accent);margin-right:0.5rem;"></i> ' + category + '</h1><p>' + commands.length + ' commands in this category</p></div><div class="search-box"><input type="text" id="search-cat-' + category.replace(/\s/g, '') + '" placeholder="Search in ' + category + '..." onkeyup="filterCategoryCommands(\'' + category + '\')"></div><div id="cat-commands-' + category.replace(/\s/g, '') + '"></div><div class="page-nav"><button class="nav-btn" onclick="showPage(\'commands\', null, event)">← All Commands</button><span class="page-indicator">' + category + '</span><span></span></div>';
        page.innerHTML = html;
        var container = document.getElementById('cat-commands-' + category.replace(/\s/g, ''));
        if (container) renderCommands(commands, container.id);
    }
    page.classList.add('active');
    if (element) {
        document.querySelectorAll('.sidebar-nav a').forEach(function(a) { a.classList.remove('active'); });
        element.classList.add('active');
    }
    if (window.innerWidth <= 768) toggleSidebar(false);
}

function filterCategoryCommands(category) {
    var searchInput = document.getElementById('search-cat-' + category.replace(/\s/g, ''));
    if (!searchInput) return;
    var search = searchInput.value.toLowerCase();
    var commands = commandData.filter(function(c) { return c.category === category; });
    var filtered = commands.filter(function(cmd) {
        return cmd.name.toLowerCase().includes(search) || cmd.description.toLowerCase().includes(search) || (cmd.aliases && cmd.aliases.some(function(a) { return a.toLowerCase().includes(search); }));
    });
    var container = document.getElementById('cat-commands-' + category.replace(/\s/g, ''));
    if (container) renderCommands(filtered, container.id);
}

var isSidebarOpen = false;

function toggleSidebar(force) {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var omnitrix = document.getElementById('omnitrixToggle');
    var icon = document.getElementById('omnitrixIcon');

    var shouldOpen;
    if (typeof force === 'boolean') {
        shouldOpen = force;
    } else {
        shouldOpen = !isSidebarOpen;
    }

    if (shouldOpen) {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        omnitrix.classList.add('active');
        icon.src = 'https://vectorfilelogo.com/wp-content/uploads/2025/07/Ben-10-Omnitrix-logo.png';
        isSidebarOpen = true;
    } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        omnitrix.classList.remove('active');
        icon.src = 'https://vectorfilelogo.com/wp-content/uploads/2025/07/Ben-10-Omnitrix-logo-Red.png';
        isSidebarOpen = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var icon = document.getElementById('omnitrixIcon');
    icon.src = 'https://vectorfilelogo.com/wp-content/uploads/2025/07/Ben-10-Omnitrix-logo-Red.png';

    var toggleBtn = document.getElementById('omnitrixToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    var overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (isSidebarOpen) toggleSidebar(false);
        });
    }

    if (window.innerWidth <= 768) {
        toggleSidebar(false);
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (isSidebarOpen) toggleSidebar(false);
    }
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        var searchInput = document.getElementById('commandSearch');
        if (searchInput) searchInput.focus();
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && isSidebarOpen) {
        toggleSidebar(false);
    }
    if (window.innerWidth <= 768) {
        if (isSidebarOpen) toggleSidebar(false);
    }
});
