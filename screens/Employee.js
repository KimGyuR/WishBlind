import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { FakeStatusBar, Button, ProfileIcon } from '../components/Shared';
import { colors } from '../theme';

const EMPLOYEES = [
  {
    id: 1,
    name: '김경미',
    position: '디자이너',
    status: '근무 중',
    statusColor: colors.green.text,
    timeIn: '09:00',
    timeOut: '18:00',
    todayHours: '8시간 30분',
    department: '디자인팀',
  },
  {
    id: 2,
    name: '박준호',
    position: '개발자',
    status: '휴식 중',
    statusColor: colors.blue.text,
    timeIn: '10:00',
    timeOut: '-',
    todayHours: '1시간 30분',
    department: '개발팀',
  },
  {
    id: 3,
    name: '이수진',
    position: '마케팅',
    status: '퇴근',
    statusColor: colors.yellow.text,
    timeIn: '09:30',
    timeOut: '17:30',
    todayHours: '8시간',
    department: '마케팅팀',
  },
  {
    id: 4,
    name: '최동욱',
    position: '개발자',
    status: '근무 중',
    statusColor: colors.green.text,
    timeIn: '09:00',
    timeOut: '18:00',
    todayHours: '8시간 45분',
    department: '개발팀',
  },
];

export default function Employee({ navigate }) {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredEmployees = EMPLOYEES.filter((emp) => {
    const matchesSearch = emp.name.includes(searchText) || emp.position.includes(searchText);
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'working') return matchesSearch && emp.status === '근무 중';
    if (selectedFilter === 'offwork') return matchesSearch && emp.status === '퇴근';
    return matchesSearch;
  });

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate?.('home')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>직원 페이지</Text>
          <TouchableOpacity>
            <ProfileIcon size={22} color={colors.main} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="이름 또는 직급으로 검색"
            placeholderTextColor={colors.textMuted}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterBtn, selectedFilter === 'all' && styles.filterBtnActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text
              style={[
                styles.filterBtnText,
                selectedFilter === 'all' && styles.filterBtnTextActive,
              ]}
            >
              전체 ({EMPLOYEES.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, selectedFilter === 'working' && styles.filterBtnActive]}
            onPress={() => setSelectedFilter('working')}
          >
            <Text
              style={[
                styles.filterBtnText,
                selectedFilter === 'working' && styles.filterBtnTextActive,
              ]}
            >
              근무 중
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, selectedFilter === 'offwork' && styles.filterBtnActive]}
            onPress={() => setSelectedFilter('offwork')}
          >
            <Text
              style={[
                styles.filterBtnText,
                selectedFilter === 'offwork' && styles.filterBtnTextActive,
              ]}
            >
              퇴근
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.employeeList}>
          {filteredEmployees.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>👤</Text>
              <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
            </View>
          ) : (
            filteredEmployees.map((emp) => (
              <TouchableOpacity
                key={emp.id}
                style={styles.employeeCard}
                onPress={() => navigate?.('employee-detail', { employee: emp })}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.employeeInfo}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{emp.name.charAt(0)}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.nameRow}>
                        <Text style={styles.employeeName}>{emp.name}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: emp.statusColor + '20' }]}>
                          <Text style={[styles.statusBadgeText, { color: emp.statusColor }]}>
                            {emp.status}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.employeePosition}>{emp.position}</Text>
                    </View>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.timeInfo}>
                  <View style={styles.timeBlock}>
                    <Text style={styles.timeLabel}>입장</Text>
                    <Text style={styles.timeValue}>{emp.timeIn}</Text>
                  </View>
                  <View style={styles.timeBlockDivider} />
                  <View style={styles.timeBlock}>
                    <Text style={styles.timeLabel}>퇴장</Text>
                    <Text style={styles.timeValue}>{emp.timeOut}</Text>
                  </View>
                  <View style={styles.timeBlockDivider} />
                  <View style={styles.timeBlock}>
                    <Text style={styles.timeLabel}>근무</Text>
                    <Text style={styles.timeValue}>{emp.todayHours}</Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.departmentInfo}>
                  <Text style={styles.departmentLabel}>소속</Text>
                  <Text style={styles.departmentValue}>{emp.department}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: colors.main,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: colors.bg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    justifyContent: 'center',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.main,
    backgroundColor: colors.white,
  },
  filterBtnActive: {
    backgroundColor: colors.main,
  },
  filterBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.main,
  },
  filterBtnTextActive: {
    color: colors.white,
  },
  employeeList: {
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  employeeCard: {
    backgroundColor: colors.accent1,
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  employeeInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  employeeName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  employeePosition: {
    fontSize: 13,
    color: colors.subtitle,
  },
  arrow: {
    fontSize: 18,
    color: colors.textMuted,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 0,
  },
  timeBlock: {
    alignItems: 'center',
    flex: 1,
  },
  timeBlockDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  timeLabel: {
    fontSize: 12,
    color: colors.subtitle,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  departmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  departmentLabel: {
    fontSize: 13,
    color: colors.subtitle,
  },
  departmentValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
