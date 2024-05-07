import Footer from "../components/Footer";

function About() {
  return (
    <>
      <div className="flex flex-col  items-center m-10">
        <p className="text-gray-500">About us</p>
        <h1 className="text-4xl font-bold mt-5">A Proficient Team with</h1>
        <h1 className="text-4xl font-bold mb-5">extensive knowledge</h1>
        <img
          className="rounded-lg my-4 w-[1024px] h-[370px] object-cover"
          src="https://i.pinimg.com/originals/a9/fe/fe/a9fefe0767b468591389c5d87eb581d0.jpg"
          alt=""
        />
        <p className="text-gray-500 font-bold text-2xl my-12">About QueenEstate:</p>
        <div className="w-[1024px]">
          <p className="text-black my-4 text-xl ">
            QueenEstate is a leading real estate agency that specializes in
            helping clients buy, sell, and rent properties in the most desirable
            neighborhoods. Our team of experienced agents is dedicated to
            providing exceptional service and making the buying and selling
            process as smooth as possible.
          </p>
          <p className="text-black my-4 text-xl ">
            Our mission is to help our clients achieve their real estate goals
            by providing expert advice, personalized service, and a deep
            understanding of the local market. Whether you are looking to buy,
            sell, or rent a property, we are here to help you every step of the
            way.
          </p>
          <p className="text-black my-4 text-xl ">
            Our team of agents has a wealth of experience and knowledge in the
            real estate industry, and we are committed to providing the highest
            level of service to our clients. We believe that buying or selling a
            property should be an exciting and rewarding experience, and we are
            dedicated to making that a reality for each and every one of our
            clients.
          </p>
        </div>
        <p className="text-gray-500 my-12 font-bold text-2xl">Team Members</p>
        <div className="flex justify-around gap-6">
          <div className="flex flex-col items-center">
            <img
              className="rounded-full mb-4 w-[150px] h-[150px] "
              src="https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58480.jpg?w=360"
              alt=""
            />
            <p>Shalini Pandey</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-[150px] h-[150px] mb-4 p-3 bg-white"
              src="https://png.pngtree.com/png-clipart/20220909/original/pngtree-women-cartoon-avatar-in-flat-style-png-image_8515458.png"
              alt=""
            />
            <p>Disha Agarwal</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="rounded-full mb-4 w-[150px] h-[150px] p-1 bg-white"
              src="https://img.freepik.com/premium-vector/portrait-brunette-woman-avatar-female-person-vector-icon-adult-flat-style_605517-159.jpg?size=626&ext=jpg"
              alt=""
            />
            <p>Ankita Pakki</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-[150px] h-[150px] mb-4 "
              src="https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58477.jpg?w=360"
              alt=""
            />
            <p>Arpita Pakki</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
