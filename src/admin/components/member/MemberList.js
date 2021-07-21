// import React from "react";
//
//
// const MemberList = ({members,changeBanned,changeRole}) =>{
//     return( members.memberList.map(member => {
//         <>
//             <tr key={member.email}>
//             <td>{member.email}</td>
//             <td>{member.name}</td>
//             <td>{member.birth}</td>
//             <td>{member.phone}</td>
//             <td>{member.address} {member.detailAddress}</td>
//             <td>{member.gender}</td>
//             <td onClick={() => changeBanned(member)} style={{textAlign: "center"}}>{member.banned ? "🔴" : "🟢"}</td>
//             <td>{member.removed ? "삭제된계정" : "정상계정"}</td>
//             <td onClick={() => changeRole(member)}>{member.roleSet[member.roleSet.length - 1]}</td>
//             <td>{member.regDate}</td>
//         </tr>
//         </>
//     })
//     )
// }
//
// const = members.memberList.map(member => {
//     return <tr key={member.email}>
//         <td>{member.email}</td>
//         <td>{member.name}</td>
//         <td>{member.birth}</td>
//         <td>{member.phone}</td>
//         <td>{member.address} {member.detailAddress}</td>
//         <td>{member.gender}</td>
//         <td onClick={() => changeBanned(member)} style={{textAlign: "center"}}>{member.banned ? "🔴" : "🟢"}</td>
//         <td>{member.removed ? "삭제된계정" : "정상계정"}</td>
//         <td onClick={() => changeRole(member)}>{member.roleSet[member.roleSet.length - 1]}</td>
//         <td>{member.regDate}</td>
//     </tr>
// })
//
//
// export default MemberList;