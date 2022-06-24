import { useEffect, useState } from "react"
import { GetUserInfo } from "service/user";
import {addTask} from "service/task";

/**
 * 添加采样任务
 */
// export const useAddTask = (task:SiteTask) => {
//     const [addResult, setAddResult] = useState<boolean>();
//
//     const refresh = () => {
//         if (task){
//             addTask(task).then(res=>{
//                 if (res.status==200){
//                     setAddResult(true)
//                 }else{
//                     setAddResult(false)
//                 }
//             }).catch(_ => { });
//         }
//     };
//
//     useEffect(refresh, [task]);
//
//     return { addResult, refresh };
// }