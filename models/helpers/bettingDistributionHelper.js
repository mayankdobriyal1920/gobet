// Generate a unique time-based ID
function generateTimeBasedId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    const counter = String(minutesSinceMidnight).padStart(4, '0'); // Ensure 4 digits
    return `${year}${month}${day}1000${counter}`;
}

// Calculate the total bet amount and distribute it among members
export function calculateUserBetAmount(members = [], minBetAmount = 100, maximumBetAmount = 10000) {
    if (!members || members.length === 0) return [];
    members.forEach(member => {
        member.balance = parseFloat(member.balance.toString());
    });
    const validMembers = members.filter(member => member.balance >= minBetAmount);
    if (validMembers.length === 0) return [];

    const totalMembers = validMembers.length;
    const minTotalBet = minBetAmount * totalMembers;
    const maxTotalBet = Math.min(
        validMembers.reduce((sum, member) => sum + Math.floor(member.balance / minBetAmount) * minBetAmount, 0),
        maximumBetAmount * totalMembers
    );

    if (minTotalBet > maxTotalBet){
        return [];
    }

    // Randomly select a total bet amount within the valid range, ensuring it's a multiple of 10, 100, or 1000
    const totalBetAmount = getValidBetAmount(minTotalBet, maxTotalBet);

    return distributeBetAmount(validMembers, totalBetAmount, minBetAmount,maximumBetAmount);
}

// Get a valid bet amount that is a multiple of 10, 100, or 1000
function getValidBetAmount(min, max) {
    const multiples = [10, 100, 1000];
    let validAmounts = [];

    multiples.forEach(multiple => {
        for (let i = min; i <= max; i += multiple) {
            if (i % multiple === 0) {
                validAmounts.push(i);
            }
        }
    });

    // Randomly select a valid amount
    return validAmounts[Math.floor(Math.random() * validAmounts.length)];
}

// Distribute the bet amount among members
function distributeBetAmount(members, totalBetAmount, minBetAmount,maximumBetAmount) {
    members.sort((a, b) => a.balance - b.balance);

    let groups = { small: [], big: [] };
    members.forEach((member, index) => groups[index % 2 === 0 ? 'small' : 'big'].push(member));

    let halfAmount = totalBetAmount / 2;
    let smallDistribution = divideAmount(halfAmount, groups.small, minBetAmount,maximumBetAmount);
    let bigDistribution = divideAmount(halfAmount, groups.big, minBetAmount,maximumBetAmount);

    return finalizeBetDistribution(groups, smallDistribution, bigDistribution, minBetAmount,maximumBetAmount);
}

// Divide the amount among members, ensuring amounts are multiples of 10, 100, or 1000
function divideAmount(amount, members, minBetAmount, maximumBetAmount) {
    let parts = members.length;
    if (parts === 0) return [];

    let divisions = new Array(parts).fill(minBetAmount);
    let remainingAmount = amount - (minBetAmount * parts);

    for (let i = 0; i < parts; i++) {
        if (remainingAmount <= 0) break;

        let maxAllocatable = Math.min(remainingAmount, members[i].balance - minBetAmount, maximumBetAmount - minBetAmount);
        let part = getValidBetAmount(0, maxAllocatable);

        divisions[i] += part;
        remainingAmount -= part;
    }

    // Distribute any remaining amount evenly, ensuring multiples of 10
    let index = 0;
    while (remainingAmount > 0) {
        let increment = Math.min(10, remainingAmount, maximumBetAmount - divisions[index % parts]);
        if (increment > 0) {
            divisions[index % parts] += increment;
            remainingAmount -= increment;
        }
        index++;
    }

    return divisions;
}


// Finalize the bet distribution and balance SMALL and BIG groups
function finalizeBetDistribution(groups, smallAmounts, bigAmounts, minBetAmount,maximumBetAmount) {
    let totalSmall = smallAmounts.reduce((sum, a) => sum + a, 0);
    let totalBig = bigAmounts.reduce((sum, a) => sum + a, 0);

    let diff = totalSmall - totalBig;

    while (diff !== 0) {
        return calculateUserBetAmount(members, minBetAmount, maximumBetAmount);
    }
    console.log('totalSmall - totalBig',totalSmall , totalBig)


    let finalDistribution = [];

    groups.small.forEach((member, index) => finalDistribution.push(createBetObject(member, smallAmounts[index], 'SMALL', totalSmall, totalBig)));
    groups.big.forEach((member, index) => finalDistribution.push(createBetObject(member, bigAmounts[index], 'BIG', totalSmall, totalBig)));

    return finalDistribution;
}

// Create a bet object for each member
function createBetObject(member, amount, option, totalSmall, totalBig) {
    return {
        user_id: member.id,
        name: member.name,
        is_test_user: member.is_test_user,
        betting_active_users_id: member.betting_active_users_id,
        option_name: option,
        amount: amount,
        balance: member.balance - amount,
        bet_id: generateTimeBasedId(),
        subscription_id: member.subscription_id,
        total_bet_amount: totalSmall + totalBig,
        total_small_amount: totalSmall,
        total_big_amount: totalBig,
    };
}


// // Example usage
// const members =  [
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs14",
//         id: "45486yhgf-gfhgfudf-ykhjg14",
//         name: "Test user 14",
//         uid: "8123126794",
//         is_test_user: 1,
//         balance: 187422936,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs18",
//         id: "45486yhgf-gfhgfudf-ykhjg18",
//         name: "Test user 18",
//         uid: "8123126798",
//         is_test_user: 1,
//         balance: 199999963,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs46",
//         id: "45486yhgf-gfhgfudf-ykhjg46",
//         name: "Test user 46",
//         uid: "8123126826",
//         is_test_user: 1,
//         balance: 199528130,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs43",
//         id: "45486yhgf-gfhgfudf-ykhjg43",
//         name: "Test user 43",
//         uid: "8123126823",
//         is_test_user: 1,
//         balance: 198469512,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs22",
//         id: "45486yhgf-gfhgfudf-ykhjg22",
//         name: "Test user 22",
//         uid: "8123126802",
//         is_test_user: 1,
//         balance: 198729807,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs27",
//         id: "45486yhgf-gfhgfudf-ykhjg27",
//         name: "Test user 27",
//         uid: "8123126807",
//         is_test_user: 1,
//         balance: 102093065,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs11",
//         id: "45486yhgf-gfhgfudf-ykhjg11",
//         name: "Test user 11",
//         uid: "8123126791",
//         is_test_user: 1,
//         balance: 177409230,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs36",
//         id: "45486yhgf-gfhgfudf-ykhjg36",
//         name: "Test user 36",
//         uid: "8123126816",
//         is_test_user: 1,
//         balance: 25613918,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs16",
//         id: "45486yhgf-gfhgfudf-ykhjg16",
//         name: "Test user 16",
//         uid: "8123126796",
//         is_test_user: 1,
//         balance: 199845060,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs20",
//         id: "45486yhgf-gfhgfudf-ykhjg20",
//         name: "Test user 20",
//         uid: "8123126800",
//         is_test_user: 1,
//         balance: 175278813,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs50",
//         id: "45486yhgf-gfhgfudf-ykhjg50",
//         name: "Test user 50",
//         uid: "8123126830",
//         is_test_user: 1,
//         balance: 133280013,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     },
//     {
//         betting_active_users_id: "wqe12-dfrwt-34fs41",
//         id: "45486yhgf-gfhgfudf-ykhjg41",
//         name: "Test user 41",
//         uid: "8123126821",
//         is_test_user: 1,
//         balance: 198786147,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     }
// ];
//
// const bets = calculateUserBetAmount(members, 10, 100);
//
// console.log(bets);