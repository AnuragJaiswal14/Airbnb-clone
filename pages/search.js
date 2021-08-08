import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range}| ${noOfGuests}guests`} />
      <main className="flex">
        <section className="fle-grow pt-14 px-6 ">
          <p className="text-xs">
            300+hotels {range} for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold  mt-2 mb-6 ">
            Stays on {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap  ">
            <p className="button">Cancellation Flexiblity</p>
            <p className="button  ">Type of Place</p>
            <p className="button ">Prices</p>
            <p className="button ">Rooms</p>
            <p className="button  ">Bed</p>
            <p className="button  ">Luxury Class</p>
            <p className="button  ">More Filters+</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, star, total, price, description }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  description={description}
                  title={title}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
