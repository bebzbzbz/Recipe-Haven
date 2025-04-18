import { Mug } from "react-kawaii";

const NotFound = () => {
    return (  
        <section className="flex flex-col items-center">
            <h2 className="-mb-4 text-4xl font-medium">Nothing here, sorry!</h2>
            <Mug size={280} mood="sad" color="#aff051" />
        </section>
    );
}

export default NotFound;