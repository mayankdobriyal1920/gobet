
function generateTimeBasedId() {
    const now = new Date();

    // Get components of the current date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero
    const day = String(now.getDate()).padStart(2, '0'); // Pad day with leading zero

    // Calculate minutes since midnight
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();

    // Calculate the dynamic counter
    const counter = 10000 + minutesSinceMidnight;

    // Combine components to form the ID
    return `${year}${month}${day}1000${counter}`;
}



export function calculateUserBetAmount(members) {
    if (!members || members.length === 0) {
        throw new Error('Members list cannot be empty.');
    }

    // Extract balances from the member objects
    const minBalance = Math.min(...members.map(member => member.balance));
    const totalMembers = members.length; // Total number of members

    // Calculate the valid range for the total bet amount
    const minBetAmount = 100 * totalMembers; // Minimum bet amount
    const maxBetAmount = Math.floor(minBalance / 100) * 100 * totalMembers; // Max bet, rounded to nearest 100

    if (minBetAmount > maxBetAmount) {
        throw new Error('Invalid member balances: Minimum bet exceeds maximum bet range.');
    }

    // Generate a random bet amount within the valid range, divisible by 100
    let totalBetAmount;
    do {
        totalBetAmount =
            Math.floor(Math.random() * ((maxBetAmount - minBetAmount) / 100 + 1)) * 100 + minBetAmount;
    } while (totalBetAmount % 100 !== 0); // Ensure divisibility by 100

    // Calculate 50% for each option
    const smallBet = totalBetAmount / 2;
    const bigBet = totalBetAmount / 2;

    return distributeBetAmount(members,{
        total: totalBetAmount,
        small: smallBet,
        big: bigBet,
    });
}

export function divideAmount(amount, parts) {
    let divisions = [];
    let remainingAmount = amount;

    // Generate random parts that sum up to 'amount'
    for (let i = 0; i < parts - 1; i++) {
        // Generate a random integer part between 1 and remainingAmount (exclusive)
        let part = Math.floor(Math.random() * remainingAmount) + 1;
        divisions.push(part);
        remainingAmount -= part;
    }

    // The last part takes whatever is left
    divisions.push(remainingAmount);

    return divisions;
}

function distributeBetAmount(members, distributionBetAmount) {
    const totalMembers = members.length;

    // Sort members by balance
    members.sort((a, b) => a.balance - b.balance);

    // Split members into two groups: 'small' and 'big'
    let resultMemberInBet = { small: [], big: [] };
    let curIndex = 'small';
    members.forEach((member) => {
        resultMemberInBet[curIndex].push(member);
        curIndex = curIndex === 'small' ? 'big' : 'small';
    });

    // Calculate the total members in each group
    let totalSmallMembers = resultMemberInBet.small.length;
    let totalBigMembers = resultMemberInBet.big.length;

    // Divide the bet amounts randomly for each group
    let smallRandomDivide = divideAmount(distributionBetAmount.small, totalSmallMembers);
    let bigRandomDivide = divideAmount(distributionBetAmount.big, totalBigMembers);

    // Function to adjust bet amounts if balance is insufficient
    function adjustAmounts(group, randomDivide) {
        let adjustedDivide = [...randomDivide]; // Copy the divide array
        for (let i = 0; i < group.length; i++) {
            const member = group[i];
            if (adjustedDivide[i] > member.balance) {
                // Calculate the excess amount
                let excess = adjustedDivide[i] - member.balance;
                adjustedDivide[i] = member.balance; // Set to max possible for this member

                // Redistribute the excess among other members
                for (let j = 0; j < group.length; j++) {
                    if (j !== i && adjustedDivide[j] < group[j].balance) {
                        const available = group[j].balance - adjustedDivide[j];
                        const redistribute = Math.min(available, excess);
                        adjustedDivide[j] += redistribute;
                        excess -= redistribute;
                        if (excess <= 0) break; // Stop redistribution if no excess remains
                    }
                }
            }
        }
        return adjustedDivide;
    }

    // Adjust bet amounts for each group
    smallRandomDivide = adjustAmounts(resultMemberInBet.small, smallRandomDivide);
    bigRandomDivide = adjustAmounts(resultMemberInBet.big, bigRandomDivide);

    // Assign the adjusted amounts to members
    let finalMemberBetDistributionObject = [];

    resultMemberInBet.small.forEach((member, index) => {
        finalMemberBetDistributionObject.push({
            user_id: member.id,
            min:1,
            betting_active_users_id: member.betting_active_users_id,
            option_name: 'SMALL',
            amount: smallRandomDivide[index],
            balance: member.balance - smallRandomDivide[index],
            bet_id:generateTimeBasedId(),
        });
    });

    resultMemberInBet.big.forEach((member, index) => {
        finalMemberBetDistributionObject.push({
            user_id: member.id,
            min:1,
            betting_active_users_id: member.betting_active_users_id,
            option_name: 'BIG',
            amount: bigRandomDivide[index],
            balance: member.balance - smallRandomDivide[index],
            bet_id:generateTimeBasedId(),
        });
    });

    return finalMemberBetDistributionObject;
}