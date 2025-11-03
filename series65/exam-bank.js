// Comprehensive Series 65 Question Bank
// Questions organized by topic with detailed explanations

const questionBank = {
    economics: [
        {
            id: 'econ_1',
            question: 'Which of the following is a leading economic indicator?',
            options: {
                a: 'Unemployment rate',
                b: 'Building permits for new homes',
                c: 'Corporate profits',
                d: 'Prime rate'
            },
            correct: 'b',
            explanation: 'Building permits for new homes is a leading indicator because it predicts future economic activity. Leading indicators change before the economy begins to follow a particular pattern.'
        },
        {
            id: 'econ_2',
            question: 'During a period of inflation, the Federal Reserve is most likely to:',
            options: {
                a: 'Lower the discount rate',
                b: 'Increase reserve requirements',
                c: 'Buy Treasury securities',
                d: 'Lower margin requirements'
            },
            correct: 'b',
            explanation: 'During inflation, the Fed uses contractionary monetary policy, including increasing reserve requirements, to reduce money supply and cool down the economy.'
        },
        {
            id: 'econ_3',
            question: 'Which phase of the business cycle is characterized by increasing unemployment and decreasing consumer spending?',
            options: {
                a: 'Expansion',
                b: 'Peak',
                c: 'Contraction',
                d: 'Trough'
            },
            correct: 'c',
            explanation: 'Contraction (or recession) is characterized by declining GDP, increasing unemployment, and decreasing consumer spending.'
        },
        {
            id: 'econ_4',
            question: 'The Consumer Price Index (CPI) primarily measures:',
            options: {
                a: 'Producer costs',
                b: 'Purchasing power risk',
                c: 'Wholesale prices',
                d: 'GDP growth'
            },
            correct: 'b',
            explanation: 'The CPI measures changes in the price level of a basket of consumer goods and services, which directly relates to purchasing power risk (inflation risk).'
        },
        {
            id: 'econ_5',
            question: 'When the Federal Reserve sells securities in the open market, this will:',
            options: {
                a: 'Increase the money supply',
                b: 'Decrease interest rates',
                c: 'Decrease the money supply',
                d: 'Have no effect on interest rates'
            },
            correct: 'c',
            explanation: 'When the Fed sells securities, it removes money from the banking system, decreasing the money supply and typically increasing interest rates.'
        },
        {
            id: 'econ_6',
            question: 'Which of the following is a coincident economic indicator?',
            options: {
                a: 'Stock market prices',
                b: 'Industrial production',
                c: 'Building permits',
                d: 'Unemployment insurance claims'
            },
            correct: 'b',
            explanation: 'Industrial production is a coincident indicator as it moves with the overall economy. Leading indicators predict changes, while coincident indicators move simultaneously with the economy.'
        },
        {
            id: 'econ_7',
            question: 'An inverted yield curve typically indicates:',
            options: {
                a: 'Economic expansion ahead',
                b: 'Possible recession ahead',
                c: 'Increasing inflation',
                d: 'Stable economic conditions'
            },
            correct: 'b',
            explanation: 'An inverted yield curve (short-term rates higher than long-term rates) has historically been a reliable predictor of economic recession.'
        },
        {
            id: 'econ_8',
            question: 'Fiscal policy is determined by:',
            options: {
                a: 'The Federal Reserve',
                b: 'The President and Congress',
                c: 'The SEC',
                d: 'State governments'
            },
            correct: 'b',
            explanation: 'Fiscal policy, which involves government spending and taxation, is determined by the President and Congress. The Federal Reserve controls monetary policy.'
        },
        {
            id: 'econ_9',
            question: 'Which economic theory suggests that increasing the money supply leads to inflation?',
            options: {
                a: 'Keynesian economics',
                b: 'Supply-side economics',
                c: 'Monetarism',
                d: 'Classical economics'
            },
            correct: 'c',
            explanation: 'Monetarism, associated with Milton Friedman, emphasizes the role of money supply in determining inflation and economic output.'
        },
        {
            id: 'econ_10',
            question: 'The discount rate is the rate at which:',
            options: {
                a: 'Banks lend to each other overnight',
                b: 'The Fed lends to member banks',
                c: 'The government borrows from foreign nations',
                d: 'Corporations issue bonds'
            },
            correct: 'b',
            explanation: 'The discount rate is the interest rate the Federal Reserve charges commercial banks for short-term loans.'
        }
    ],

    investments: [
        {
            id: 'inv_1',
            question: 'An investor purchases a call option. What is the maximum potential loss?',
            options: {
                a: 'The premium paid',
                b: 'The strike price',
                c: 'Unlimited',
                d: 'The current market price'
            },
            correct: 'a',
            explanation: 'When purchasing a call option, the maximum loss is limited to the premium paid. This is one of the benefits of being an option buyer.'
        },
        {
            id: 'inv_2',
            question: 'When interest rates rise, the value of existing bonds will:',
            options: {
                a: 'Increase',
                b: 'Decrease',
                c: 'Remain unchanged',
                d: 'Increase only for long-term bonds'
            },
            correct: 'b',
            explanation: 'Bonds have an inverse relationship with interest rates. When interest rates rise, existing bond values fall because new bonds offer higher yields.'
        },
        {
            id: 'inv_3',
            question: 'Which investment company has a fixed number of shares and trades on an exchange?',
            options: {
                a: 'Open-end mutual fund',
                b: 'Closed-end fund',
                c: 'Unit investment trust',
                d: 'Face-amount certificate company'
            },
            correct: 'b',
            explanation: 'Closed-end funds have a fixed number of shares that trade on exchanges, unlike open-end mutual funds which continuously issue and redeem shares.'
        },
        {
            id: 'inv_4',
            question: 'Treasury Inflation-Protected Securities (TIPS) provide protection against:',
            options: {
                a: 'Credit risk',
                b: 'Market risk',
                c: 'Purchasing power risk',
                d: 'Liquidity risk'
            },
            correct: 'c',
            explanation: 'TIPS protect against purchasing power risk (inflation risk) by adjusting the principal based on CPI changes.'
        },
        {
            id: 'inv_5',
            question: 'A bond\'s duration measures:',
            options: {
                a: 'Credit quality',
                b: 'Interest rate sensitivity',
                c: 'Default probability',
                d: 'Liquidity'
            },
            correct: 'b',
            explanation: 'Duration measures a bond\'s sensitivity to interest rate changes. The higher the duration, the more sensitive the bond is to rate changes.'
        },
        {
            id: 'inv_6',
            question: 'Which security gives holders the right to purchase common stock at a predetermined price?',
            options: {
                a: 'Preferred stock',
                b: 'Convertible bond',
                c: 'Warrant',
                d: 'Call option'
            },
            correct: 'c',
            explanation: 'Warrants give the holder the right to purchase common stock at a predetermined price, typically attached to bonds as a sweetener.'
        },
        {
            id: 'inv_7',
            question: 'A mutual fund with a Net Asset Value of $10.00 and a Public Offering Price of $10.75 has a sales charge of:',
            options: {
                a: '6.5%',
                b: '6.98%',
                c: '7.0%',
                d: '7.5%'
            },
            correct: 'b',
            explanation: 'Sales charge % = (POP - NAV) / POP = ($10.75 - $10.00) / $10.75 = $0.75 / $10.75 = 6.98%'
        },
        {
            id: 'inv_8',
            question: 'Which of the following investments provides the greatest protection against inflation?',
            options: {
                a: 'Corporate bonds',
                b: 'Preferred stock',
                c: 'Common stock',
                d: 'Money market funds'
            },
            correct: 'c',
            explanation: 'Common stock historically provides the best long-term protection against inflation as companies can raise prices and increase earnings.'
        },
        {
            id: 'inv_9',
            question: 'An ETF is BEST described as:',
            options: {
                a: 'A closed-end fund that trades throughout the day',
                b: 'An open-end fund that trades like a stock',
                c: 'A unit investment trust with a fixed portfolio',
                d: 'A type of mutual fund sold with a sales load'
            },
            correct: 'b',
            explanation: 'Exchange-Traded Funds (ETFs) are open-end investment companies that trade on exchanges throughout the day like stocks, offering intraday liquidity.'
        },
        {
            id: 'inv_10',
            question: 'A zero-coupon bond:',
            options: {
                a: 'Pays interest annually',
                b: 'Is sold at a premium',
                c: 'Accrues interest that is taxed annually',
                d: 'Has no interest rate risk'
            },
            correct: 'c',
            explanation: 'Zero-coupon bonds are sold at a discount and pay no periodic interest, but the accrued interest (imputed interest) is taxable annually as phantom income.'
        },
        {
            id: 'inv_11',
            question: 'Which statement about REITs is TRUE?',
            options: {
                a: 'They must distribute at least 75% of income to shareholders',
                b: 'They must distribute at least 90% of income to shareholders',
                c: 'They are exempt from all taxation',
                d: 'They cannot be traded on exchanges'
            },
            correct: 'b',
            explanation: 'REITs must distribute at least 90% of their taxable income to shareholders to maintain their tax-advantaged status.'
        },
        {
            id: 'inv_12',
            question: 'American Depositary Receipts (ADRs) are used to:',
            options: {
                a: 'Facilitate trading of U.S. stocks in foreign markets',
                b: 'Facilitate trading of foreign stocks in U.S. markets',
                c: 'Hedge currency risk',
                d: 'Avoid SEC registration'
            },
            correct: 'b',
            explanation: 'ADRs are receipts representing shares of foreign companies, allowing U.S. investors to invest in foreign securities without dealing with foreign exchanges.'
        },
        {
            id: 'inv_13',
            question: 'A bond selling at a premium has a yield to maturity that is:',
            options: {
                a: 'Higher than its coupon rate',
                b: 'Lower than its coupon rate',
                c: 'Equal to its coupon rate',
                d: 'Unrelated to its coupon rate'
            },
            correct: 'b',
            explanation: 'When a bond sells at a premium (above par), its yield to maturity is lower than its coupon rate because investors are paying more than par value.'
        },
        {
            id: 'inv_14',
            question: 'Systematic risk is:',
            options: {
                a: 'Company-specific risk',
                b: 'Diversifiable risk',
                c: 'Market risk affecting all securities',
                d: 'Credit risk'
            },
            correct: 'c',
            explanation: 'Systematic risk (market risk) affects all securities and cannot be eliminated through diversification. It includes interest rate risk, inflation risk, and political risk.'
        },
        {
            id: 'inv_15',
            question: 'Dollar cost averaging results in a lower average cost per share if:',
            options: {
                a: 'Stock prices are constantly rising',
                b: 'Stock prices are constantly falling',
                c: 'Stock prices fluctuate',
                d: 'Stock prices remain stable'
            },
            correct: 'c',
            explanation: 'Dollar cost averaging is most effective when prices fluctuate, as you buy more shares when prices are low and fewer when prices are high.'
        }
    ],

    recommendations: [
        {
            id: 'rec_1',
            question: 'A 35-year-old client with a high risk tolerance and a 25-year time horizon would be BEST suited for which portfolio allocation?',
            options: {
                a: '80% bonds, 20% stocks',
                b: '50% bonds, 50% stocks',
                c: '20% bonds, 80% stocks',
                d: '100% bonds'
            },
            correct: 'c',
            explanation: 'A young client (35) with high risk tolerance and long time horizon (25 years) can tolerate market volatility and benefit from higher equity allocation (80% stocks, 20% bonds).'
        },
        {
            id: 'rec_2',
            question: 'Which retirement account allows for tax-free qualified withdrawals in retirement?',
            options: {
                a: 'Traditional IRA',
                b: 'SEP IRA',
                c: 'Roth IRA',
                d: 'SIMPLE IRA'
            },
            correct: 'c',
            explanation: 'Roth IRA allows for tax-free qualified withdrawals in retirement. Contributions are made with after-tax dollars, but qualified distributions are tax-free.'
        },
        {
            id: 'rec_3',
            question: 'The wash sale rule prohibits claiming a loss if a substantially identical security is purchased within how many days?',
            options: {
                a: '15 days before or after',
                b: '30 days before or after',
                c: '60 days before or after',
                d: '90 days before or after'
            },
            correct: 'b',
            explanation: 'The wash sale rule prohibits claiming a loss if a substantially identical security is purchased within 30 days before or after the sale (61-day window total).'
        },
        {
            id: 'rec_4',
            question: 'An investor in the 32% tax bracket is considering a municipal bond yielding 4%. What is the tax-equivalent yield?',
            options: {
                a: '5.26%',
                b: '5.88%',
                c: '6.45%',
                d: '7.12%'
            },
            correct: 'b',
            explanation: 'Tax-equivalent yield = Municipal yield / (1 - Tax bracket) = 4% / (1 - 0.32) = 4% / 0.68 = 5.88%'
        },
        {
            id: 'rec_5',
            question: 'What is the primary purpose of portfolio rebalancing?',
            options: {
                a: 'Maximize returns',
                b: 'Minimize taxes',
                c: 'Maintain target asset allocation',
                d: 'Reduce transaction costs'
            },
            correct: 'c',
            explanation: 'The primary purpose of portfolio rebalancing is to maintain the target asset allocation as market movements cause portfolio weights to drift from targets.'
        },
        {
            id: 'rec_6',
            question: 'Required Minimum Distributions (RMDs) from traditional IRAs must begin at age:',
            options: {
                a: '59½',
                b: '65',
                c: '70½',
                d: '73'
            },
            correct: 'd',
            explanation: 'Under the SECURE Act 2.0, RMDs from traditional IRAs must begin at age 73 (for those born 1951-1959) or age 75 (born 1960 or later).'
        },
        {
            id: 'rec_7',
            question: 'A conservative investor\'s primary investment objective would be:',
            options: {
                a: 'Capital appreciation',
                b: 'Capital preservation',
                c: 'Speculation',
                d: 'Aggressive growth'
            },
            correct: 'b',
            explanation: 'Conservative investors prioritize capital preservation, seeking to protect principal while generating modest income with minimal risk.'
        },
        {
            id: 'rec_8',
            question: 'Which type of risk can be reduced through diversification?',
            options: {
                a: 'Systematic risk',
                b: 'Market risk',
                c: 'Unsystematic risk',
                d: 'Interest rate risk'
            },
            correct: 'c',
            explanation: 'Unsystematic risk (company-specific risk) can be reduced through diversification. Systematic risk (market risk) cannot be diversified away.'
        },
        {
            id: 'rec_9',
            question: 'A 529 plan is used for:',
            options: {
                a: 'Retirement savings',
                b: 'Health care expenses',
                c: 'Education expenses',
                d: 'Estate planning'
            },
            correct: 'c',
            explanation: '529 plans are tax-advantaged savings plans designed to encourage saving for future education expenses. Qualified withdrawals for education are tax-free.'
        },
        {
            id: 'rec_10',
            question: 'The maximum contribution to a Traditional IRA for 2024 is:',
            options: {
                a: '$6,000',
                b: '$6,500',
                c: '$7,000',
                d: '$7,500'
            },
            correct: 'c',
            explanation: 'For 2024, the maximum IRA contribution is $7,000, with an additional $1,000 catch-up contribution allowed for those age 50 and older.'
        },
        {
            id: 'rec_11',
            question: 'What is the beta of the overall market?',
            options: {
                a: '0',
                b: '0.5',
                c: '1.0',
                d: '2.0'
            },
            correct: 'c',
            explanation: 'By definition, the market has a beta of 1.0. Securities with beta > 1 are more volatile than the market; beta < 1 are less volatile.'
        },
        {
            id: 'rec_12',
            question: 'A client sells stock at a loss on December 15. To avoid a wash sale, the client must wait until when to repurchase the same stock?',
            options: {
                a: 'December 30',
                b: 'January 1',
                c: 'January 15',
                d: 'January 31'
            },
            correct: 'c',
            explanation: 'The wash sale rule is 30 days before or after. Selling on Dec 15, the client must wait until at least Jan 15 (31 days later) to avoid the wash sale.'
        },
        {
            id: 'rec_13',
            question: 'Modern Portfolio Theory suggests investors should focus on:',
            options: {
                a: 'Maximizing returns only',
                b: 'Minimizing risk only',
                c: 'Optimizing the risk-return tradeoff',
                d: 'Timing the market'
            },
            correct: 'c',
            explanation: 'Modern Portfolio Theory emphasizes optimizing the risk-return tradeoff by building diversified portfolios that maximize expected return for a given level of risk.'
        },
        {
            id: 'rec_14',
            question: 'The standard deviation of a portfolio measures:',
            options: {
                a: 'Expected return',
                b: 'Volatility',
                c: 'Correlation',
                d: 'Diversification'
            },
            correct: 'b',
            explanation: 'Standard deviation measures the volatility or variability of returns around the mean, indicating the portfolio\'s risk level.'
        },
        {
            id: 'rec_15',
            question: 'A laddered bond portfolio is designed to reduce:',
            options: {
                a: 'Credit risk',
                b: 'Reinvestment risk',
                c: 'Default risk',
                d: 'Purchasing power risk'
            },
            correct: 'b',
            explanation: 'A laddered bond portfolio, with bonds maturing at different intervals, reduces reinvestment risk by spreading out maturity dates and providing regular cash flow.'
        }
    ],

    regulations: [
        {
            id: 'reg_1',
            question: 'An investment adviser must register with the SEC if they have assets under management exceeding:',
            options: {
                a: '$50 million',
                b: '$100 million',
                c: '$110 million',
                d: '$150 million'
            },
            correct: 'c',
            explanation: 'Investment advisers must register with the SEC if they have assets under management exceeding $110 million. Below that threshold, they typically register with states.'
        },
        {
            id: 'reg_2',
            question: 'Form ADV Part 2 must be delivered to clients:',
            options: {
                a: 'Within 48 hours after signing the contract',
                b: 'At least 48 hours before or at the time of signing the contract',
                c: 'Within 5 business days of signing the contract',
                d: 'Only if the client requests it'
            },
            correct: 'b',
            explanation: 'Form ADV Part 2 (brochure) must be delivered at least 48 hours before signing the contract, or at the time of signing if the client has a 5-day right to cancel.'
        },
        {
            id: 'reg_3',
            question: 'Investment adviser records must be maintained for a minimum of:',
            options: {
                a: '3 years',
                b: '5 years',
                c: '6 years',
                d: '10 years'
            },
            correct: 'b',
            explanation: 'Investment adviser records must be maintained for a minimum of 5 years, with the first 2 years in the principal office.'
        },
        {
            id: 'reg_4',
            question: 'Which of the following is NOT a fiduciary duty?',
            options: {
                a: 'Duty of care',
                b: 'Duty of loyalty',
                c: 'Duty of profitability',
                d: 'Duty of obedience'
            },
            correct: 'c',
            explanation: 'The three main fiduciary duties are duty of care, duty of loyalty, and duty of obedience. "Duty of profitability" is not a recognized fiduciary duty.'
        },
        {
            id: 'reg_5',
            question: 'Performance-based fees may only be charged to:',
            options: {
                a: 'Any client who agrees in writing',
                b: 'Qualified clients with $1M+ with adviser or $2.5M+ net worth',
                c: 'Accredited investors only',
                d: 'Institutional clients only'
            },
            correct: 'b',
            explanation: 'Performance-based fees may only be charged to qualified clients who have at least $1 million invested with the adviser or a net worth exceeding $2.5 million.'
        },
        {
            id: 'reg_6',
            question: 'The statute of limitations for civil liabilities under the USA is:',
            options: {
                a: '1 year',
                b: '2 years',
                c: '3 years',
                d: '5 years'
            },
            correct: 'c',
            explanation: 'Under the Uniform Securities Act, the statute of limitations for civil liabilities is 3 years from the date of sale or the violation.'
        },
        {
            id: 'reg_7',
            question: 'Under the Investment Advisers Act, which is TRUE about custody of client funds?',
            options: {
                a: 'It is always prohibited',
                b: 'It requires annual surprise audits and qualified custodian',
                c: 'It is allowed without special requirements',
                d: 'Only state-registered advisers may have custody'
            },
            correct: 'b',
            explanation: 'Custody of client funds is permitted but requires special safeguards including annual surprise audits by independent accountants and use of a qualified custodian.'
        },
        {
            id: 'reg_8',
            question: 'An adviser may borrow from a client if:',
            options: {
                a: 'The client agrees in writing',
                b: 'The client is a qualified investor',
                c: 'The client is a financial institution in the business of lending',
                d: 'It is never permitted under any circumstances'
            },
            correct: 'c',
            explanation: 'An adviser may only borrow from a client if the client is a financial institution in the business of lending (e.g., a bank).'
        },
        {
            id: 'reg_9',
            question: 'Under the Uniform Securities Act, which person must register as an investment adviser representative?',
            options: {
                a: 'A clerical employee',
                b: 'A person who solicits clients for an investment adviser',
                c: 'An employee who only provides research',
                d: 'A receptionist'
            },
            correct: 'b',
            explanation: 'A person who solicits clients for an investment adviser must register as an investment adviser representative. Clerical and ministerial employees are exempt.'
        },
        {
            id: 'reg_10',
            question: 'An investment adviser advertisement may NOT:',
            options: {
                a: 'Include testimonials',
                b: 'State facts about the firm',
                c: 'Offer free services',
                d: 'Include the firm\'s name'
            },
            correct: 'a',
            explanation: 'Under federal rules, investment adviser advertisements historically could not include testimonials, though recent rule changes have modified this with certain conditions.'
        },
        {
            id: 'reg_11',
            question: 'A federal covered security is exempt from:',
            options: {
                a: 'All state regulation',
                b: 'State registration requirements',
                c: 'Antifraud provisions',
                d: 'Federal registration'
            },
            correct: 'b',
            explanation: 'Federal covered securities are exempt from state registration requirements but are still subject to state antifraud provisions and notice filing.'
        },
        {
            id: 'reg_12',
            question: 'An investment adviser must update its Form ADV:',
            options: {
                a: 'Quarterly',
                b: 'Semi-annually',
                c: 'Annually and within 30 days of material changes',
                d: 'Only when requested by the SEC'
            },
            correct: 'c',
            explanation: 'Investment advisers must update Form ADV annually within 90 days of fiscal year end and promptly (within 30 days) for material changes.'
        },
        {
            id: 'reg_13',
            question: 'Which act regulates the registration of investment advisers?',
            options: {
                a: 'Securities Act of 1933',
                b: 'Securities Exchange Act of 1934',
                c: 'Investment Advisers Act of 1940',
                d: 'Investment Company Act of 1940'
            },
            correct: 'c',
            explanation: 'The Investment Advisers Act of 1940 regulates investment advisers and requires certain advisers to register with the SEC.'
        },
        {
            id: 'reg_14',
            question: 'Soft dollar arrangements must:',
            options: {
                a: 'Benefit the adviser only',
                b: 'Benefit the clients',
                c: 'Be kept confidential',
                d: 'Be prohibited in all cases'
            },
            correct: 'b',
            explanation: 'Soft dollar arrangements (using client commissions to pay for research and brokerage services) are permitted but must benefit clients and be fully disclosed.'
        },
        {
            id: 'reg_15',
            question: 'An investment adviser brochure must be delivered:',
            options: {
                a: 'To all prospective clients',
                b: 'Only to clients who request it',
                c: 'Only to accredited investors',
                d: 'To institutional clients only'
            },
            correct: 'a',
            explanation: 'The investment adviser brochure (Form ADV Part 2A) must be delivered to all prospective clients, with certain limited exceptions for institutional clients.'
        },
        {
            id: 'reg_16',
            question: 'Trading on material non-public information is:',
            options: {
                a: 'Legal if disclosed',
                b: 'Insider trading and prohibited',
                c: 'Allowed for advisers only',
                d: 'Legal after 24 hours'
            },
            correct: 'b',
            explanation: 'Trading on material non-public information constitutes insider trading and is prohibited under federal securities laws.'
        },
        {
            id: 'reg_17',
            question: 'Under the USA, the Administrator may require an investment adviser to:',
            options: {
                a: 'Post a surety bond',
                b: 'Guarantee investment results',
                c: 'Charge minimum fees',
                d: 'Accept all clients'
            },
            correct: 'a',
            explanation: 'State Administrators may require investment advisers to post a surety bond as a condition of registration to protect clients.'
        },
        {
            id: 'reg_18',
            question: 'An investment adviser representative is associated with a federal covered adviser. The IAR must register with:',
            options: {
                a: 'The SEC only',
                b: 'The state only',
                c: 'Both SEC and state',
                d: 'Neither SEC nor state'
            },
            correct: 'b',
            explanation: 'Investment adviser representatives of federal covered advisers must register with the state(s) where they conduct business, not with the SEC.'
        },
        {
            id: 'reg_19',
            question: 'Churning is:',
            options: {
                a: 'Excessive trading to generate commissions',
                b: 'Selling securities at a loss',
                c: 'Buying and selling the same security',
                d: 'Portfolio rebalancing'
            },
            correct: 'a',
            explanation: 'Churning is excessive trading in a client\'s account primarily to generate commissions, violating the duty of loyalty.'
        },
        {
            id: 'reg_20',
            question: 'Which of the following would NOT be considered an investment adviser under the Investment Advisers Act?',
            options: {
                a: 'A financial planner who charges fees for advice',
                b: 'A broker-dealer whose advice is solely incidental and receives no special compensation',
                c: 'A pension consultant',
                d: 'An asset manager'
            },
            correct: 'b',
            explanation: 'Broker-dealers are excluded from the definition of investment adviser if their advice is solely incidental to their brokerage business and they receive no special compensation for advice.'
        }
    ],

    // Additional comprehensive questions covering edge cases and advanced topics
    advanced: [
        {
            id: 'adv_1',
            question: 'An IAR recommends a security to a client without disclosing that the IAR will receive additional compensation. This is:',
            options: {
                a: 'Acceptable if the security is suitable',
                b: 'A violation of fiduciary duty',
                c: 'Allowed under the USA',
                d: 'Permitted with verbal disclosure'
            },
            correct: 'b',
            explanation: 'Failure to disclose conflicts of interest, including additional compensation, violates the fiduciary duty of loyalty and disclosure requirements.'
        },
        {
            id: 'adv_2',
            question: 'Under the brochure rule, an investment adviser must deliver Form ADV Part 2 to clients at least 48 hours before entering into the contract OR:',
            options: {
                a: 'At the time of contract if client has 5-day penalty-free withdrawal',
                b: 'Within 10 days after the contract',
                c: 'Only if the client is not an accredited investor',
                d: 'Never, if the client is institutional'
            },
            correct: 'a',
            explanation: 'The brochure must be delivered 48 hours before OR at the time of contract if the client has a 5-day right to terminate without penalty.'
        },
        {
            id: 'adv_3',
            question: 'A broker-dealer is exempt from investment adviser registration if:',
            options: {
                a: 'They charge fees for advice',
                b: 'Advice is solely incidental and no special compensation is received',
                c: 'They only advise institutional clients',
                d: 'They are registered in one state only'
            },
            correct: 'b',
            explanation: 'Broker-dealers are excluded from IA definition if advice is solely incidental to brokerage and they receive no special compensation for advice.'
        },
        {
            id: 'adv_4',
            question: 'Which statement about ERISA is TRUE?',
            options: {
                a: 'It regulates state government pension plans',
                b: 'It sets standards for private sector pension plans',
                c: 'It is administered by the SEC',
                d: 'It only applies to defined contribution plans'
            },
            correct: 'b',
            explanation: 'ERISA (Employee Retirement Income Security Act) sets minimum standards for private sector pension and health plans, administered by the Department of Labor.'
        },
        {
            id: 'adv_5',
            question: 'A variable annuity during the accumulation phase:',
            options: {
                a: 'Guarantees a fixed return',
                b: 'Is not a security',
                c: 'Has investment risk borne by the purchaser',
                d: 'Provides guaranteed income'
            },
            correct: 'c',
            explanation: 'Variable annuities are securities where the purchaser bears the investment risk. Returns vary based on the performance of the separate account.'
        },
        {
            id: 'adv_6',
            question: 'The Sharpe Ratio measures:',
            options: {
                a: 'Absolute return',
                b: 'Risk-adjusted return',
                c: 'Tax efficiency',
                d: 'Correlation'
            },
            correct: 'b',
            explanation: 'The Sharpe Ratio measures risk-adjusted return by comparing excess return (above risk-free rate) to standard deviation.'
        },
        {
            id: 'adv_7',
            question: 'Under the USA, an Administrator may deny registration to an applicant who:',
            options: {
                a: 'Was convicted of a misdemeanor 15 years ago',
                b: 'Was convicted of a securities-related felony 8 years ago',
                c: 'Has no experience in the securities industry',
                d: 'Failed the exam once before'
            },
            correct: 'b',
            explanation: 'The Administrator may deny registration to someone convicted of a securities-related felony within the past 10 years.'
        },
        {
            id: 'adv_8',
            question: 'A securities professional who has discretionary authority over a customer account CANNOT:',
            options: {
                a: 'Decide which security to buy or sell',
                b: 'Decide when to execute transactions',
                c: 'Decide how many shares to trade',
                d: 'Open a margin account without written authorization'
            },
            correct: 'd',
            explanation: 'While discretionary authority allows deciding which security, amount, and timing, opening a margin account requires specific written authorization.'
        },
        {
            id: 'adv_9',
            question: 'Capital market theory assumes that:',
            options: {
                a: 'Markets are inefficient',
                b: 'Investors are risk-seeking',
                c: 'Investors are rational and risk-averse',
                d: 'Transaction costs are significant'
            },
            correct: 'c',
            explanation: 'Capital market theory assumes investors are rational, risk-averse, and seek to maximize utility given their risk tolerance.'
        },
        {
            id: 'adv_10',
            question: 'An investment policy statement should include all of the following EXCEPT:',
            options: {
                a: 'Investment objectives',
                b: 'Risk tolerance',
                c: 'Specific securities to purchase',
                d: 'Time horizon'
            },
            correct: 'c',
            explanation: 'An IPS outlines objectives, constraints, and guidelines but does not specify individual securities. It provides a framework for decision-making.'
        },
        {
            id: 'adv_11',
            question: 'The holding period for capital gains to be taxed at long-term rates is:',
            options: {
                a: 'More than 6 months',
                b: 'More than 12 months',
                c: 'More than 18 months',
                d: 'More than 24 months'
            },
            correct: 'b',
            explanation: 'Securities must be held for more than 12 months to qualify for long-term capital gains treatment and preferential tax rates.'
        },
        {
            id: 'adv_12',
            question: 'An agent of a broker-dealer may share in profits and losses in a customer account if:',
            options: {
                a: 'The customer gives verbal permission',
                b: 'The sharing is proportional to the agent\'s contribution and approved by the firm',
                c: 'The account is discretionary',
                d: 'It is never permitted'
            },
            correct: 'b',
            explanation: 'Agents may share in customer accounts only with written customer authorization, firm approval, and in proportion to their financial contribution.'
        },
        {
            id: 'adv_13',
            question: 'The efficient market hypothesis suggests that:',
            options: {
                a: 'Technical analysis is highly effective',
                b: 'Stock prices reflect all available information',
                c: 'Insider trading is profitable',
                d: 'Markets are always wrong'
            },
            correct: 'b',
            explanation: 'The EMH states that stock prices reflect all available information, making it difficult to consistently outperform the market through analysis.'
        },
        {
            id: 'adv_14',
            question: 'A tombstone advertisement:',
            options: {
                a: 'Must include a prospectus',
                b: 'Can be published during the cooling-off period',
                c: 'Constitutes an offer to sell',
                d: 'Is prohibited by the SEC'
            },
            correct: 'b',
            explanation: 'A tombstone ad is permitted during the cooling-off period, provides basic information, and explicitly states it is not an offer to sell.'
        },
        {
            id: 'adv_15',
            question: 'The Investment Company Act of 1940 requires open-end funds to redeem shares at:',
            options: {
                a: 'The previous day\'s NAV',
                b: 'The current NAV',
                c: 'The next calculated NAV',
                d: 'A 5% discount to NAV'
            },
            correct: 'c',
            explanation: 'Open-end funds use forward pricing - shares are redeemed at the next calculated NAV after the order is received.'
        },
        {
            id: 'adv_16',
            question: 'A wrap fee program:',
            options: {
                a: 'Charges separate fees for advice and execution',
                b: 'Bundles advisory and execution fees into one charge',
                c: 'Is prohibited under federal law',
                d: 'Can only be offered by broker-dealers'
            },
            correct: 'b',
            explanation: 'A wrap fee program bundles investment advisory and execution services into a single fee, requiring special disclosure (Form ADV Part 2A Appendix 1).'
        },
        {
            id: 'adv_17',
            question: 'Under the Securities Act of 1933, which transaction is exempt?',
            options: {
                a: 'Public offering of common stock',
                b: 'Private placement under Regulation D',
                c: 'Sale of preferred stock',
                d: 'IPO of corporate bonds'
            },
            correct: 'b',
            explanation: 'Regulation D provides exemptions for private placements to accredited investors and institutional buyers, avoiding full SEC registration.'
        },
        {
            id: 'adv_18',
            question: 'A client with a short time horizon and low risk tolerance should invest primarily in:',
            options: {
                a: 'Growth stocks',
                b: 'Long-term bonds',
                c: 'Money market instruments',
                d: 'Emerging market equity'
            },
            correct: 'c',
            explanation: 'Money market instruments provide liquidity, capital preservation, and low risk, suitable for short time horizons and conservative investors.'
        },
        {
            id: 'adv_19',
            question: 'Form 13F must be filed by institutional investment managers with at least:',
            options: {
                a: '$50 million in assets',
                b: '$100 million in equity securities',
                c: '$500 million in total assets',
                d: '$1 billion in equity'
            },
            correct: 'b',
            explanation: 'Form 13F must be filed quarterly by institutional investment managers with at least $100 million in Section 13(f) securities under management.'
        },
        {
            id: 'adv_20',
            question: 'The main purpose of the Securities Exchange Act of 1934 is to:',
            options: {
                a: 'Regulate new issues',
                b: 'Regulate secondary market trading',
                c: 'Regulate investment advisers',
                d: 'Regulate mutual funds'
            },
            correct: 'b',
            explanation: 'The Securities Exchange Act of 1934 regulates secondary market trading, broker-dealers, exchanges, and requires periodic reporting by public companies.'
        },
        {
            id: 'adv_21',
            question: 'Alpha measures:',
            options: {
                a: 'Systematic risk',
                b: 'Total risk',
                c: 'Risk-adjusted excess return',
                d: 'Volatility'
            },
            correct: 'c',
            explanation: 'Alpha measures the excess return of an investment relative to its benchmark on a risk-adjusted basis, indicating manager skill.'
        },
        {
            id: 'adv_22',
            question: 'A mutual fund\'s expense ratio includes all of the following EXCEPT:',
            options: {
                a: 'Management fees',
                b: '12b-1 fees',
                c: 'Operating expenses',
                d: 'Sales loads'
            },
            correct: 'd',
            explanation: 'The expense ratio includes management fees, 12b-1 fees, and operating expenses, but NOT front-end or back-end sales loads.'
        },
        {
            id: 'adv_23',
            question: 'Under UGMA/UTMA, the custodian has a fiduciary duty to:',
            options: {
                a: 'Maximize returns at any risk',
                b: 'Act in the minor\'s best interests',
                c: 'Use funds for custodian\'s benefit',
                d: 'Transfer assets to the custodian at age 21'
            },
            correct: 'b',
            explanation: 'The custodian under UGMA/UTMA has a fiduciary duty to manage assets in the minor\'s best interests until the age of majority.'
        },
        {
            id: 'adv_24',
            question: 'The maximum 401(k) employee contribution for 2024 is:',
            options: {
                a: '$19,500',
                b: '$20,500',
                c: '$22,500',
                d: '$23,000'
            },
            correct: 'd',
            explanation: 'For 2024, the maximum employee 401(k) contribution is $23,000, with an additional $7,500 catch-up for those 50 and older.'
        },
        {
            id: 'adv_25',
            question: 'Passive investment management strategy is BEST described as:',
            options: {
                a: 'Frequent trading to beat the market',
                b: 'Investing in index funds to match market returns',
                c: 'Stock picking based on research',
                d: 'Market timing strategies'
            },
            correct: 'b',
            explanation: 'Passive management seeks to match market returns by investing in index funds or ETFs, minimizing costs and trading.'
        },
        {
            id: 'adv_26',
            question: 'An investment adviser who has custody must send account statements to clients:',
            options: {
                a: 'Monthly',
                b: 'Quarterly',
                c: 'Annually',
                d: 'Only upon request'
            },
            correct: 'b',
            explanation: 'Investment advisers with custody must send account statements to clients at least quarterly, showing all transactions and positions.'
        },
        {
            id: 'adv_27',
            question: 'Which of the following is a systematic risk?',
            options: {
                a: 'Business risk',
                b: 'Financial risk',
                c: 'Interest rate risk',
                d: 'Default risk'
            },
            correct: 'c',
            explanation: 'Interest rate risk is systematic (market) risk affecting all securities. Business, financial, and default risks are unsystematic (diversifiable) risks.'
        },
        {
            id: 'adv_28',
            question: 'Dollar-weighted return is BEST described as:',
            options: {
                a: 'Simple average return',
                b: 'Time-weighted return',
                c: 'Internal rate of return',
                d: 'Compound annual growth rate'
            },
            correct: 'c',
            explanation: 'Dollar-weighted return is the internal rate of return (IRR), accounting for the timing and amount of cash flows in and out of an investment.'
        },
        {
            id: 'adv_29',
            question: 'The primary regulatory purpose of requiring investment advisers to maintain books and records is:',
            options: {
                a: 'Tax preparation',
                b: 'Facilitating regulatory examinations',
                c: 'Marketing purposes',
                d: 'Client billing'
            },
            correct: 'b',
            explanation: 'Books and records requirements facilitate SEC and state examinations to ensure compliance with securities laws and protect investors.'
        },
        {
            id: 'adv_30',
            question: 'A technical analyst would be MOST interested in:',
            options: {
                a: 'P/E ratios',
                b: 'Company earnings',
                c: 'Moving averages',
                d: 'Dividend yields'
            },
            correct: 'c',
            explanation: 'Technical analysts focus on price and volume patterns, including moving averages, rather than fundamental company data.'
        }
    ]
};

// Function to get random questions from question bank
function getRandomQuestions(count = 130) {
    const allQuestions = [
        ...questionBank.economics,
        ...questionBank.investments,
        ...questionBank.recommendations,
        ...questionBank.regulations,
        ...questionBank.advanced
    ];

    // Shuffle array using Fisher-Yates algorithm
    const shuffled = allQuestions.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return requested number of questions (or all if less than count available)
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Function to get questions by topic
function getQuestionsByTopic(topic, count = null) {
    const questions = questionBank[topic] || [];
    if (count) {
        return questions.slice(0, count);
    }
    return questions;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionBank, getRandomQuestions, getQuestionsByTopic };
}
