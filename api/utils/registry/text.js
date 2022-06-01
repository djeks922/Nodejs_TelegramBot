export const influencerRegistryText = (influencer) => {
    let socialText = `Social platforms:\n`
    for (let [i,social] of influencer.socials.entries()) {
        socialText = socialText.concat(`  ${i}.${social.platform}: ${social.url}\n`)
    }
    let packageText = `Packages:\n` 
    for (let [i,pkg] of influencer.packages.entries()){
        packageText = packageText.concat(`  ${i}.Name: ${pkg.name}, Details: ${pkg.detail}, Price: ${pkg.price}\n`)
    }
    return `NEW REGISTRY APPLICATON\nUsername: @${influencer.username}\n${socialText}${packageText}\nRequirement: ${influencer.requirement}\nWallet: ${influencer.wallet}`
}