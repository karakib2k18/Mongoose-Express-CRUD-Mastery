import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
const port = 5000;

console.log(process.cwd());
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
