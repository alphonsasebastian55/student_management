
export const showMarkOfSubject = (marks, subject_id) => {
    const exists = marks.find(m=>m.subject_id==subject_id);
    return exists?exists.mark:'NA'
}