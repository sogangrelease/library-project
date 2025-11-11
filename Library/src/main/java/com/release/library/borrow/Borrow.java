package com.release.library.borrow;

import com.release.library.book.Book;
import com.release.library.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "borrow",
        uniqueConstraints = @UniqueConstraint(name = "ux_borrow_book_unique", columnNames = "book_id"))
public class Borrow {

    @Id
    @Column(name = "borrow_id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "book_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_borrow_book"))
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_borrow_member"))
    private Member member;

    @Column(name = "return_at", nullable = false)
    private LocalDateTime returnAt;


}
