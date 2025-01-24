var cron = require("node-cron");
const { addDays, startOfDaSy } = require("date-fns");

const sendEmail = require("./ses_sendEmail");
const ConnectionRequestsModel = require("../models/connectionRequest");

const { USER_STATUS } = require("./constants");

// const yesterday = addDays(new Date(), -1);
// const countHrs = setHours(new Date(), 8);
// console.log(yesterday, "hello", countHrs);

cron.schedule("34 56 4 * * *", async () => {
  try {
    const yesterday = addDays(new Date(), -3);
    const yesterStartDay = startOfDay(yesterday);
    // const yesterdayEndDate = endOfDay(yesterday);

    // find karo sare pendingRequest connection jo ki interested hoo last days se mtlb pichle kl se 8:00 am se
    const yesterdayPendingRequests = await ConnectionRequestsModel.find({
      status: USER_STATUS.INTERESTED,
      createdAt: {
        $gt: yesterStartDay,
        // $lt: yesterdayEndDate,
      },
    })
      .populate("fromUserId toUserId", "firstName emailId")
      .select("fromUserId toUserId"); // we can inform These  pendingRequest to user emails

    const emailList = [
      ...new Set(yesterdayPendingRequests.map((req) => req.toUserId.emailId)),
    ].splice(0, 4);

    for (const email of emailList) {
      await sendEmail.run(
        "You received Some New Friend Request on" + email,
        "Open Profile"
      );
    }
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
});
