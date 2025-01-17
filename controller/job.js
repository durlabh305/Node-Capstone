const Job = require("../modals/job")

const createJobPost = async (req, res) => {
    try {
        const {
            companyName, logourl, title, description, salary, location, duration, locationType, skills, refUserId
        } = req.body;

        if (
            !companyName || !logourl || !title || !description || !salary || !location || !duration || !locationType || !skills
        ) {
            return res.status(400).json({ errorMessage: "Bad Request" })
        }
        
        const userId = req.userId;

        const jobDetails = new Job({
            companyName,
            logourl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            refUserId: userId
        })

        await jobDetails.save();
        res.json({message: "Job Created Successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: "Something went wrong!" });

    }
}

const getJobDetailsById = async (req, res) => {
    try{
        const jobId = req.params.jobId;

        const jobDetails = await Job.findById(jobId);

        if(!jobDetails){
            return res.status(400).json({errorMessage: "Bad Request"})
        }

        res.json({data: jobDetails})

    }catch(error){
        console.log(error);
        res.status(500).json({errorMessage: "Something went wrong!"})
    }
}
module.exports = {createJobPost, getJobDetailsById }