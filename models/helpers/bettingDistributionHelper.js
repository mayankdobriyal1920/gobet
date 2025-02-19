function generateTimeBasedId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    const counter = 10000 + minutesSinceMidnight;
    return `${year}${month}${day}1000${counter + 1}`;
}

export function calculateUserBetAmount(members) {
    if (!members || members.length === 0) {
        throw new Error('Members list cannot be empty.');
    }

    // Ensure members have at least 100 balance
    const validMembers = members.filter(member => member.balance >= 100);
    if (validMembers.length === 0) {
        throw new Error('No members have sufficient balance.');
    }

    const totalMembers = validMembers.length;
    const minBetAmount = 100 * totalMembers;
    const maxBetAmount = Math.min(...validMembers.map(m => Math.floor(m.balance / 100) * 100)) * totalMembers;

    if (minBetAmount > maxBetAmount) {
        throw new Error('Invalid member balances: Minimum bet exceeds maximum bet range.');
    }

    let totalBetAmount;
    do {
        totalBetAmount = Math.floor(Math.random() * ((maxBetAmount - minBetAmount) / 100 + 1)) * 100 + minBetAmount;
    } while (totalBetAmount % 100 !== 0);

    const smallBet = totalBetAmount / 2;
    const bigBet = totalBetAmount / 2;

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
        let part = Math.floor(Math.random() * maxAllocatable) + 1;
        divisions[i] = part;
        remainingAmount -= part;
    }
    divisions[parts - 1] = remainingAmount;
    return divisions;
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

    function adjustAmounts(group, randomDivide) {
        let adjustedDivide = [...randomDivide];
        for (let i = 0; i < group.length; i++) {
            const member = group[i];
            if (adjustedDivide[i] > member.balance) {
                let excess = adjustedDivide[i] - member.balance;
                adjustedDivide[i] = member.balance;
                for (let j = 0; j < group.length; j++) {
                    if (j !== i && adjustedDivide[j] < group[j].balance) {
                        let available = group[j].balance - adjustedDivide[j];
                        let redistribute = Math.min(available, excess);
                        adjustedDivide[j] += redistribute;
                        excess -= redistribute;
                        if (excess <= 0) break;
                    }
                }
            }
        }
        return adjustedDivide;
    }

    smallRandomDivide = adjustAmounts(resultMemberInBet.small, smallRandomDivide);
    bigRandomDivide = adjustAmounts(resultMemberInBet.big, bigRandomDivide);

    let finalMemberBetDistributionObject = [];

    resultMemberInBet.small.forEach((member, index) => {
        finalMemberBetDistributionObject.push({
            user_id: member.id,
            name: member.name,
            is_test_user: member.is_test_user,
            min: 1,
            betting_active_users_id: member.betting_active_users_id,
            option_name: 'SMALL',
            amount: smallRandomDivide[index],
            balance: member.balance - smallRandomDivide[index],
            balance_after_deduct_percentage: member.balance - Math.round(0.02 * smallRandomDivide[index]) - smallRandomDivide[index],
            bet_id: generateTimeBasedId(),
            total_bet_amount: distributionBetAmount.total,
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
            amount: bigRandomDivide[index],
            balance: member.balance - bigRandomDivide[index],
            balance_after_deduct_percentage: member.balance - Math.round(0.02 * bigRandomDivide[index]) - bigRandomDivide[index],
            bet_id: generateTimeBasedId(),
            total_bet_amount: distributionBetAmount.total,
        });
    });

    return finalMemberBetDistributionObject;
}
