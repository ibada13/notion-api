import { genratekey } from "./extralib/fakeactions";
export default function Home  ()  { 
  genratekey()
  return (
      <h1 className="text-red-500 text-4xl text-center uppercase">this is from home </h1>
  );
}