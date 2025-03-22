
// Calculate the total bet amount and distribute it among members
export function calculateUserBetAmount(members = [], minBetAmount = 100, maximumBetAmount = 10000,gameBetId) {
    if (!members.length) return [];

    // Convert balance to numbers
    members.forEach(member => member.balance = Number(member.balance));

    // Filter valid members who meet minBetAmount
    const validMembers = members.filter(member => member.balance >= minBetAmount);
    if (!validMembers.length) return [];

    const totalMembers = validMembers.length;
    const minTotalBet = minBetAmount * totalMembers;
    const maxTotalBet = Math.min(
        validMembers.reduce((sum, member) => sum + Math.floor(member.balance / minBetAmount) * minBetAmount, 0),
        maximumBetAmount * totalMembers
    );

    if (minTotalBet > maxTotalBet) return [];

    // Get a valid total bet amount
    const totalBetAmount = getValidBetAmount(minTotalBet, maxTotalBet);
    return distributeBetAmount(validMembers, totalBetAmount, minBetAmount, maximumBetAmount,gameBetId);
}

// Get a valid bet amount that is a multiple of 10
function getValidBetAmount(min, max) {
    min = Math.ceil(min / 10) * 10; // Round up to nearest multiple of 10
    return min > max ? null : Math.floor(Math.random() * ((max - min) / 10 + 1)) * 10 + min;
}

// Distribute the bet amount among members
function distributeBetAmount(members, totalBetAmount, minBetAmount, maximumBetAmount,gameBetId) {
    members.sort((a, b) => a.balance - b.balance);

    const groups = { small: [], big: [] };
    members.forEach((member, i) => groups[i % 2 ? 'big' : 'small'].push(member));

    const halfAmount = totalBetAmount / 2;
    const smallDistribution = divideAmount(halfAmount, groups.small, minBetAmount, maximumBetAmount);
    const bigDistribution = divideAmount(halfAmount, groups.big, minBetAmount, maximumBetAmount);

    return finalizeBetDistribution(groups, smallDistribution, bigDistribution, minBetAmount,gameBetId);
}

// Divide the amount among members, ensuring multiples of 10
function divideAmount(amount, members, minBetAmount, maximumBetAmount) {
    if (!members.length) return [];

    amount = Math.floor(amount / 10) * 10; // Ensure multiple of 10
    const totalAvailable = Math.min(
        amount,
        members.reduce((sum, m) => sum + Math.min(maximumBetAmount, Math.floor(m.balance / 10) * 10), 0)
    );

    const parts = members.length;
    let divisions = Array(parts).fill(minBetAmount);
    let remainingAmount = totalAvailable - (minBetAmount * parts);

    for (let i = 0; i < parts && remainingAmount > 0; i++) {
        let maxAllocatable = Math.min(
            remainingAmount,
            Math.floor((members[i].balance - minBetAmount) / 10) * 10,
            maximumBetAmount - minBetAmount
        );

        let part = getValidBetAmount(0, maxAllocatable) || 0;
        divisions[i] += part;
        remainingAmount -= part;
    }

    let index = 0;
    while (remainingAmount >= 10) {
        let i = index % parts;
        let maxIncrement = Math.min(
            10,
            remainingAmount,
            Math.floor((members[i].balance - divisions[i]) / 10) * 10,
            maximumBetAmount - divisions[i]
        );

        if (maxIncrement > 0) {
            divisions[i] += maxIncrement;
            remainingAmount -= maxIncrement;
        }

        if (++index > parts * 2) break; // Prevent infinite loop
    }

    return divisions;
}

// Finalize the bet distribution and balance SMALL and BIG groups
function finalizeBetDistribution(groups, smallAmounts, bigAmounts, minBetAmount, gameBetId) {
    let totalSmall = smallAmounts.reduce((sum, a) => sum + a, 0);
    let totalBig = bigAmounts.reduce((sum, a) => sum + a, 0);
    let diff = totalSmall - totalBig;

    // Adjust bets to make totalSmall === totalBig
    if (diff !== 0) {
        let adjustmentArray = diff > 0 ? smallAmounts : bigAmounts;
        let adjustIndex = 0;

        while (Math.abs(diff) >= 10) {
            let i = adjustIndex % adjustmentArray.length;
            let maxAdjustable = Math.min(10, Math.abs(diff), adjustmentArray[i] - minBetAmount);

            if (maxAdjustable > 0) {
                adjustmentArray[i] -= maxAdjustable;
                diff += diff > 0 ? -maxAdjustable : maxAdjustable;
            }

            if (++adjustIndex > adjustmentArray.length * 2) break;
        }

        totalSmall = smallAmounts.reduce((sum, a) => sum + a, 0);
        totalBig = bigAmounts.reduce((sum, a) => sum + a, 0);
    }

    // Ensure totalSmall === totalBig by discarding extra values if necessary
    if (totalSmall !== totalBig) totalSmall = totalBig = Math.min(totalSmall, totalBig);

    return [
        ...groups.small.map((member, i) => createBetObject(member, smallAmounts[i], 'SMALL', totalSmall, totalBig,gameBetId)),
        ...groups.big.map((member, i) => createBetObject(member, bigAmounts[i], 'BIG', totalSmall, totalBig,gameBetId))
    ];
}

// Create a bet object for each member
function createBetObject(member, amount, option, totalSmall, totalBig,gameBetId) {
    return {
        user_id: member.id,
        name: member.name,
        is_test_user: member.is_test_user,
        betting_active_users_id: member.betting_active_users_id,
        option_name: option,
        amount,
        balance: member.balance - amount,
        bet_id: gameBetId,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 1947,
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
//         balance: 197,
//         subscription_id: null,
//         plan_type: null,
//         total_value: null,
//         subscription_balance: null,
//         subscription_expiry_date: null,
//     }
// ];
//
// console.log(calculateUserBetAmount(members, 100, 1000));