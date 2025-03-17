function generateTimeBasedId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    const counter = 10000 + minutesSinceMidnight;
    return `${year}${month}${day}1000${counter + 2}`;
}

export function calculateUserBetAmount(members = []) {
    if (!members || members.length === 0) {
        return [];
    }

    const validMembers = members.filter(member => member.balance >= 10);
    if (validMembers.length === 0) {
        return [];
    }

    const totalMembers = validMembers.length;
    const minBetAmount = 10 * totalMembers;
    const maxBetAmount = Math.min(...validMembers.map(m => Math.floor(m.balance / 10) * 10)) * totalMembers;

    if (minBetAmount > maxBetAmount) {
        return [];
    }

    let totalBetAmount;
    do {
        totalBetAmount = Math.floor(Math.random() * ((maxBetAmount - minBetAmount) / 10 + 1)) * 10 + minBetAmount;
    } while (totalBetAmount % 10 !== 0);

    const smallBet = totalBetAmount / 2;
    const bigBet = totalBetAmount / 2;

    console.log({
        total: totalBetAmount,
        small: smallBet,
        big: bigBet,
    })

    return distributeBetAmount(validMembers, {
        total: totalBetAmount,
        small: smallBet,
        big: bigBet,
    });
}

function divideAmount(amount, parts, members) {
    let divisions = new Array(parts).fill(0);
    let remainingAmount = amount;

    for (let i = 0; i < parts - 1; i++) {
        let maxAllocatable = Math.min(remainingAmount, members[i].balance);
        let part = formatBetAmount(Math.floor(Math.random() * maxAllocatable) + 1);
        divisions[i] = part;
        remainingAmount -= part;
    }
    divisions[parts - 1] = formatBetAmount(remainingAmount);
    return divisions;
}

function formatBetAmount(amount) {
    if (amount >= 1000) return Math.floor(amount / 1000) * 1000;
    if (amount >= 100) return Math.floor(amount / 100) * 100;
    return Math.floor(amount / 10) * 10;
}

function distributeBetAmount(members, distributionBetAmount) {
    members.sort((a, b) => a.balance - b.balance);
    let resultMemberInBet = { small: [], big: [] };
    let curIndex = Math.random() < 0.5 ? 'small' : 'big';

    members.forEach(member => {
        resultMemberInBet[curIndex].push(member);
        curIndex = curIndex === 'small' ? 'big' : 'small';
    });

    let totalSmallMembers = resultMemberInBet.small.length;
    let totalBigMembers = resultMemberInBet.big.length;

    let smallRandomDivide = divideAmount(distributionBetAmount.small, totalSmallMembers, resultMemberInBet.small);
    let bigRandomDivide = divideAmount(distributionBetAmount.big, totalBigMembers, resultMemberInBet.big);

    function balanceSmallBigTotals(smallRandomDivide, bigRandomDivide) {
        let smallTotal = smallRandomDivide.reduce((sum, val) => sum + val, 0);
        let bigTotal = bigRandomDivide.reduce((sum, val) => sum + val, 0);
        let diff = Math.abs(smallTotal - bigTotal);

        if (smallTotal > bigTotal) {
            for (let i = 0; i < totalBigMembers; i++) {
                if (bigRandomDivide[i] + diff <= members[i].balance) {
                    bigRandomDivide[i] += diff;
                    break;
                }
            }
        } else if (bigTotal > smallTotal) {
            for (let i = 0; i < totalSmallMembers; i++) {
                if (smallRandomDivide[i] + diff <= members[i].balance) {
                    smallRandomDivide[i] += diff;
                    break;
                }
            }
        }
        return { smallRandomDivide, bigRandomDivide };
    }

    let { smallRandomDivide: adjustedSmall, bigRandomDivide: adjustedBig } = balanceSmallBigTotals(smallRandomDivide, bigRandomDivide);

    let finalMemberBetDistributionObject = [];
    // Calculate total small and big amounts
    const totalSmallAmount = adjustedSmall.reduce((sum, amount) => sum + amount, 0);
    const totalBigAmount = adjustedBig.reduce((sum, amount) => sum + amount, 0);

    resultMemberInBet.small.forEach((member, index) => {
        finalMemberBetDistributionObject.push({
            user_id: member.id,
            name: member.name,
            is_test_user: member.is_test_user,
            min: 1,
            betting_active_users_id: member.betting_active_users_id,
            option_name: 'SMALL',
            amount: adjustedSmall[index],
            balance: member.balance - adjustedSmall[index],
            bet_id: generateTimeBasedId(),
            subscription_id: member.subscription_id,
            total_bet_amount: totalSmallAmount + totalBigAmount,
            total_small_amount: totalSmallAmount,  // Added total small amount
            total_big_amount: totalBigAmount,      // Added total big amount
        });
    });

    resultMemberInBet.big.forEach((member, index) => {
        finalMemberBetDistributionObject.push({
            user_id: member.id,
            name: member.name,
            is_test_user: member.is_test_user,
            min: 1,
            betting_active_users_id: member.betting_active_users_id,
            option_name: 'BIG',
            amount: adjustedBig[index],
            balance: member.balance - adjustedBig[index],
            bet_id: generateTimeBasedId(),
            subscription_id: member.subscription_id,
            total_bet_amount: totalSmallAmount + totalBigAmount,
            total_small_amount: totalSmallAmount,  // Added total small amount
            total_big_amount: totalBigAmount,      // Added total big amount
        });
    });
    return finalMemberBetDistributionObject;
}

// const testUsers = [
//     { id: 1, name: "User A", is_test_user: false, balance: 1500, betting_active_users_id: 101 },
//     { id: 2, name: "User B", is_test_user: false, balance: 2000, betting_active_users_id: 102 },
//     { id: 3, name: "User C", is_test_user: false, balance: 5000, betting_active_users_id: 103 },
//     { id: 4, name: "User D", is_test_user: false, balance: 3000, betting_active_users_id: 104 },
//     { id: 5, name: "User E", is_test_user: false, balance: 7000, betting_active_users_id: 105 },
//     { id: 6, name: "User F", is_test_user: false, balance: 1200, betting_active_users_id: 106 }
// ];
// console.log(calculateUserBetAmount(testUsers));


// export function calculateUserBetAmount(members = []) {
//     if (!members || members.length === 0) {
//         return [];
//     }
//
//     // Ensure members have at least 100 balance
//     const validMembers = members.filter(member => member.balance >= 100);
//     if (validMembers.length === 0) {
//         return [];
//     }
//
//     const totalMembers = validMembers.length;
//     const minBetAmount = 100 * totalMembers;
//     const maxBetAmount = Math.min(...validMembers.map(m => Math.floor(m.balance / 100) * 100)) * totalMembers;
//
//     if (minBetAmount > maxBetAmount) {
//         return [];
//     }
//
//     let totalBetAmount;
//     do {
//         totalBetAmount = Math.floor(Math.random() * ((maxBetAmount - minBetAmount) / 100 + 1)) * 100 + minBetAmount;
//     } while (totalBetAmount % 100 !== 0);
//
//     const smallBet = totalBetAmount / 2;
//     const bigBet = totalBetAmount / 2;
//
//     return distributeBetAmount(validMembers, {
//         total: totalBetAmount,
//         small: smallBet,
//         big: bigBet,
//     });
// }
//
// function divideAmount(amount, parts, members) {
//     let divisions = new Array(parts).fill(0);
//     let remainingAmount = amount;
//
//     for (let i = 0; i < parts - 1; i++) {
//         let maxAllocatable = Math.min(remainingAmount, members[i].balance);
//         let part = Math.floor(Math.random() * maxAllocatable) + 1;
//         divisions[i] = part;
//         remainingAmount -= part;
//     }
//     divisions[parts - 1] = remainingAmount;
//     return divisions;
// }
//
// function distributeBetAmount(members, distributionBetAmount) {
//     members.sort((a, b) => a.balance - b.balance);
//     let resultMemberInBet = { small: [], big: [] };
//     let curIndex = Math.random() < 0.5 ? 'small' : 'big';
//
//     members.forEach(member => {
//         resultMemberInBet[curIndex].push(member);
//         curIndex = curIndex === 'small' ? 'big' : 'small';
//     });
//
//     let totalSmallMembers = resultMemberInBet.small.length;
//     let totalBigMembers = resultMemberInBet.big.length;
//
//     let smallRandomDivide = divideAmount(distributionBetAmount.small, totalSmallMembers, resultMemberInBet.small);
//     let bigRandomDivide = divideAmount(distributionBetAmount.big, totalBigMembers, resultMemberInBet.big);
//
//     function adjustAmounts(group, randomDivide) {
//         let adjustedDivide = [...randomDivide];
//         for (let i = 0; i < group.length; i++) {
//             const member = group[i];
//             if (adjustedDivide[i] > member.balance) {
//                 let excess = adjustedDivide[i] - member.balance;
//                 adjustedDivide[i] = member.balance;
//                 for (let j = 0; j < group.length; j++) {
//                     if (j !== i && adjustedDivide[j] < group[j].balance) {
//                         let available = group[j].balance - adjustedDivide[j];
//                         let redistribute = Math.min(available, excess);
//                         adjustedDivide[j] += redistribute;
//                         excess -= redistribute;
//                         if (excess <= 0) break;
//                     }
//                 }
//             }
//         }
//         return adjustedDivide;
//     }
//
//     smallRandomDivide = adjustAmounts(resultMemberInBet.small, smallRandomDivide);
//     bigRandomDivide = adjustAmounts(resultMemberInBet.big, bigRandomDivide);
//
//     let finalMemberBetDistributionObject = [];
//
//     resultMemberInBet.small.forEach((member, index) => {
//         finalMemberBetDistributionObject.push({
//             user_id: member.id,
//             name: member.name,
//             is_test_user: member.is_test_user,
//             min: 1,
//             betting_active_users_id: member.betting_active_users_id,
//             option_name: 'SMALL',
//             amount: smallRandomDivide[index],
//             balance: member.balance - smallRandomDivide[index],
//             bet_id: generateTimeBasedId(),
//             total_bet_amount: distributionBetAmount.total,
//         });
//     });
//
//     resultMemberInBet.big.forEach((member, index) => {
//         finalMemberBetDistributionObject.push({
//             user_id: member.id,
//             name: member.name,
//             is_test_user: member.is_test_user,
//             min: 1,
//             betting_active_users_id: member.betting_active_users_id,
//             option_name: 'BIG',
//             amount: bigRandomDivide[index],
//             balance: member.balance - bigRandomDivide[index],
//             bet_id: generateTimeBasedId(),
//             total_bet_amount: distributionBetAmount.total,
//         });
//     });
//
//     return finalMemberBetDistributionObject;
// }
