import { MongoClient } from 'mongodb';

async function getDB(clientId) {
  // const url = `mongodb://localhost`;
  const url = `mongodb+srv://ins:ins12%24%24@openmarket.5ppv889.mongodb.net/?retryWrites=true&w=majority`;

  console.log(`DB 접속 시도: ${url}`, clientId);

  try {
    const client = new MongoClient(url);

    await client.connect();
    console.info(`DB 접속 성공: ${url}`, clientId);
    const db = client.db(clientId);
    db.user = db.collection('user');
    db.product = db.collection('product');
    db.cart = db.collection('cart');
    db.order = db.collection('order');
    db.reply = db.collection('reply');
    db.seq = db.collection('seq');
    db.code = db.collection('code');
    db.bookmark = db.collection('bookmark');
    db.config = db.collection('config');
    db.post = db.collection('post');

    const nextSeq = async (_id) => {
      let result = await db.seq.findOneAndUpdate({ _id }, { $inc: { no: 1 } });
      if (!result) {
        result = { _id, no: 1 };
        await db.seq.insertOne({ _id, no: 2 });
      }
      return result.no;
    };

    return { db, client, nextSeq };
  } catch (err) {
    console.error(err);
  }
}

export default getDB;
