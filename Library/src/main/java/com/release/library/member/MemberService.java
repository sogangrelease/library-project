package com.release.library.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    //유저 찾아서 반환
    public User getUser(String studentId) {
            User user = this.userRepository.findByStudentId(studentId);
            return user;
    }
}
