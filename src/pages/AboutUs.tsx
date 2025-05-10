const AboutUs = () => {
    return (  
        <section className="lg: mx-auto">
            <h2 className="text-center mb-10 text-4xl font-medium">About Us</h2>
            <div className="grid lg:grid-cols-[2fr_3fr] gap-10">
                <div className="flex flex-col md:flex-row lg:flex-col gap-5 text-center items-center">
                    <figure className="md:w-1/2 lg:w-80">
                        <img src="/img/badger.jpg" alt="Badger stealing food" className="rounded-full w-80 h-60 md:h-80 object-cover" />
                        <figcaption>Amanda</figcaption>
                    </figure>
                    <figure className="md:w-1/2 lg:w-80 lg:self-end">
                        <img src="/img/shiba.jpg" alt="Shiba Inu selling produce" className="rounded-full w-80 h-60 md:h-80 object-cover" />
                        <figcaption>Pedro</figcaption>
                    </figure>
                </div>
                
                    
                <article className="flex flex-col gap-5">
                    <p>Hello, we are Amanda and Pedro and we are happy to present our work on Recipe Haven. While exploring this amazing website, we discovered a gastronomic universe full of delicious recipes, useful tips and culinary inspiration. Recipe Haven is a place where experienced chefs and novice cooks can unite in their passion for food.</p>
                    <p>What particularly impressed us was the variety of recipes. From traditional, cosy dishes to more innovative creations, there are options for every taste and every occasion. Each recipe is carefully selected and tested to ensure that the results are always tasty and worth sharing.</p>
                    <p>In addition to the recipes, Recipe Haven also offers useful tips for improving your own cooking skills. From preparation techniques to suggestions for flavour combinations, the website invites you to discover and experiment in the kitchen. It is a cosy and inclusive environment where everyone is encouraged to immerse themselves in the art of cooking and discover new possibilities.</p>
                    <p>In short, Recipe Haven is an inspiring gastronomic space that invites us to discover, create and share our passion for cooking. We hope that our presentation has sparked your interest in joining us on this delicious journey into the Recipe Haven!</p>
                </article>                
            </div>
        </section>
    );
}

export default AboutUs;